import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { LoginOffice, UserData } from "@interfaces/user.interface";
import { UserService } from "@services/general/user.service";
import { Subscription, switchMap } from "rxjs";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public formData: FormGroup;
  public formLogin: FormGroup;
  public user: UserData;
  public login: LoginOffice;
  public sSub: Subscription;
  public submited: boolean = false;
  public passwordShow: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.userService.getById(params["id"]))
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

    this.formLogin = new FormGroup({
      login: new FormControl(""),
      password: new FormControl(""),
    });

    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.userService.getLoginById(params["id"])
        )
      )
      .subscribe((login: LoginOffice) => {
        this.login = login;
        this.formLogin = new FormGroup({
          login: new FormControl(login.login || ""),
          password: new FormControl(login.password || ""),
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
      .updateUser({
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

  submitLogin() {
    if (this.formLogin.invalid) {
      return;
    }
    this.submited = true;
    this.userService.updateLogin({
      ...this.login,
      login: this.formLogin.value.login,
      password: this.formLogin.value.password,
    });
  }

  ngOnDestroy(): void {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }
}
