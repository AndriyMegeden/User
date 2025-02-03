import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserData } from "@interfaces/user.interface";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      surname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\+?\d{10,10}$/)  // Валідація для номера телефону
      ]),
      email: new FormControl(null, Validators.email),
      adress: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      textarea: new FormControl(null),
    });
  }

  // дозволяє вводити тільки цифри
  onPhoneInput(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab']; // Дозволяємо натискання цих клавіш
    const char = String.fromCharCode(event.keyCode);
  
    if (!/[\d+]/.test(char) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Блокуємо введення, якщо символ не цифра або знак '+'
    }
  }
  
  

  submit() {
    if (this.form.invalid) {
      return;
    }
    const data: UserData = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      telephone: this.form.value.telephone,
      email: this.form.value.email,
      adress: this.form.value.adress,
      textarea: this.form.value.textarea,
    };
    console.log(data)
  }
}
