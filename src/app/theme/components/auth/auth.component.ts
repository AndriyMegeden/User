import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { isPlatform } from "@ionic/angular";
import { AuthService } from "@core/auth-service/services/auth.service";
import { HttpErrorService } from "@core/auth-service/services/http-error.service";
import { loginSetting } from "@static/auth.settings";
import { AuthSettings, AuthType } from "@interfaces/auth.interface";
import { logo } from "@static/theme.settings";
import { ToastService } from "@services/general/toast.service";
import { User } from "@interfaces/user.interface";

type LoginType = "local" | "social";
type SocialProvider = "google" | "facebook" | "apple";
type ChangeFormPages =
  | "forgot-password-step-1"
  | "forgot-password-step-2"
  | "forgot-password-step-3";

isPlatform;
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  public logo: string = logo;

  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  public passwordShow: boolean = false;
  public passwordMatch: boolean = false;
  public submitted: boolean = false;
  public resetEmail: string = "";
  public resetId: string = "";
  public resetSecret: string = "";

  @Input() page: AuthType;
  @Output() onGetData = new EventEmitter<{
    page: string;
    type: LoginType;
    provider: SocialProvider;
    data: any;
  }>();

  @Output() onResetData = new EventEmitter();

  public currentMode: AuthSettings;
  public form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add("margin");
    } else {
      document.body.classList.remove("margin");
    }

    if (this.isIOS) {
      document.body.classList.add("apple-auth");
    } else {
      document.body.classList.remove("apple-auth");
    }
    if (this.page === "login") {
      this.currentMode = loginSetting;
      this.createForm();
    }
  }

  createForm() {
    const formControlsConfig = {};
    this.currentMode.fields.forEach((field) => {
      formControlsConfig[field.fieldId] = new FormControl(
        field.value,
        field.validators
      );
    });

    this.form = new FormGroup(formControlsConfig);
  }

  login(route: string) {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };
    this.authService.login(user).subscribe((res) => {
      this.form.reset();
      this.router.navigateByUrl(route);
      this.submitted = false
    });
  }

  getError() {
    if (this.form.controls.password && this.form.controls.repeatPassword) {
      if (
        this.form.controls.password.value ===
        this.form.controls.repeatPassword.value
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      false;
    }
  }
}
