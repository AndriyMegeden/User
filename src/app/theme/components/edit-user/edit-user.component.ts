import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { UserData } from "@interfaces/user.interface";
import { UserService } from "@services/general/user.service";
import { Subscription, switchMap } from "rxjs";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public formData: FormGroup;
  public user: UserData;
  public sSub: Subscription;
  public submited: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.userService.getById(params["id"]);
        })
      )
      .subscribe((user: UserData) => {
        this.user = user;
        this.formData = new FormGroup({
          name: new FormControl(user.name),
          surname: new FormControl(user.surname),
          telephone: new FormControl(user.telephone),
          email: new FormControl(user.email),
          adress: new FormControl(user.adress),
          textarea: new FormControl(user.textarea),
        });
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

    this.submited = true;
   this.sSub = this.userService
      .update({
        ...this.user,
        name: this.formData.value.name,
        surname: this.formData.value.surname,
        telephone: this.formData.value.telephone,
        email: this.formData.value.email,
        adress: this.formData.value.adress,
        textarea: this.formData.value.textarea,
      })
      .subscribe(() => {
        this.submited = false;
      });
  }

  ngOnDestroy(): void {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }
}
