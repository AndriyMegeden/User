import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginOffice, UserData } from "@interfaces/user.interface";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  formData: FormGroup;
  formLogin: FormGroup;
  public passwordShow: boolean = false;
  constructor() {}

  ngOnInit() {
    // форма створення абонента
    this.formData = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      surname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      telephone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\+?\d{10,10}$/), // Валідація для номера телефону
      ]),
      email: new FormControl(null, Validators.email),
      adress: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      textarea: new FormControl(null),
    });
    // форма даних кабінета користувача
    this.formLogin = new FormGroup({
      login: new FormControl(null, [Validators.required,  Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required,  Validators.minLength(3)]),
    });
  }

  // дозволяє вводити тільки цифри
  onPhoneInput(event: KeyboardEvent) {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"]; // Дозволяємо натискання цих клавіш
    const char = String.fromCharCode(event.keyCode);

    if (!/[\d+]/.test(char) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Блокуємо введення, якщо символ не цифра або знак '+'
    }
  }

  submitData() {
    if (this.formData.invalid) {
      return;
    }
    const data: UserData = {
      name: this.formData.value.name,
      surname: this.formData.value.surname,
      telephone: this.formData.value.telephone,
      email: this.formData.value.email,
      adress: this.formData.value.adress,
      textarea: this.formData.value.textarea,
    };
    console.log(data);
  }

  submitLogin() {
    if (this.formLogin.invalid) {
      return;
    }
    const loginData: LoginOffice = {
      login: this.formLogin.value.login,
      password: this.formLogin.value.password,
    };
    console.log(loginData);
  }
}
