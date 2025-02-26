import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import {
  LoginOffice,
  SessionInterface,
  UserData,
} from "@interfaces/user.interface";
import { ToastController } from "@ionic/angular";
import { UserService } from "@services/general/user.service";
import { Subscription, switchMap } from "rxjs";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit, OnDestroy {
  public formData!: FormGroup;
  public formLogin!: FormGroup;
  public formInternetSession!: FormGroup;
  public user: UserData;
  public login: LoginOffice;
  public session: SessionInterface;
  public lastSubmitTime = 0;
  public sSub: Subscription;
  public submited: boolean = false;
  public passwordShow: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // форма користувача
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.userService.getUserById(params["id"])
        )
      )
      .subscribe((user: UserData) => {

        if (!user) {
          console.log('дані користувача відсутні');
          return;
        }


        this.user = user;
        this.formData = new FormGroup({
          name: new FormControl(user.name, [
            Validators.required,
            Validators.minLength(3),
          ]),
          surname: new FormControl(user.surname, [
            Validators.required,
            Validators.minLength(3),
          ]),
          telephone: new FormControl(user.telephone, [
            Validators.required,
            Validators.pattern(/^\+?\d{10,10}$/), // Валідація для номера телефону
          ]),
          email: new FormControl(user.email, Validators.email),
          adress: new FormControl(user.adress, [
            Validators.required,
            Validators.minLength(3),
          ]),
          textarea: new FormControl(user.textarea),
        });
      });

    // форма логіна
    this.formLogin = new FormGroup({
      login: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl("", [
            Validators.required,
            Validators.minLength(3),
          ]),
    });
    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.userService.getLoginById(params["id"])
        )
      )
      .subscribe((login: LoginOffice) => {

        if (!login) {
          console.log('дані логіна відсутні');
          return;
        }
        this.login = login;
        this.formLogin = new FormGroup({
          login: new FormControl(login.login, [
            Validators.required,
            Validators.minLength(3),
          ]),
          password: new FormControl(login.password, [
            Validators.required,
            Validators.minLength(3),
          ]),
        });
      });

    // форма сесії
    this.formInternetSession = new FormGroup({
      isActive: new FormControl(false, [
        Validators.required,
      ]),
      
      balance: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.min(50),
      ]),
      credit: new FormControl("", [
        Validators.minLength(2),
        Validators.min(50),
      ]),
      macAdress: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([0-9A-Za-z]{2}:){5}[0-9A-Za-z]{2}$/),
      ]),
      vlan: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(4),
      ]),
      port: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(3),
      ]),
      tariff: new FormControl("", [Validators.required]),
      ipType: new FormControl("", [Validators.required]),
      // ipAddress: new FormControl(""),
    });

    this.route.params
      .pipe(
        switchMap((params: Params) =>
          this.userService.getSessionById(params["id"])
        )
      )
      .subscribe((session: SessionInterface) => {
        if (!session) {
          console.log('дані сесії відсутні');
          return;
        }


        this.session = session;
        this.formInternetSession = new FormGroup({
          isActive: new FormControl(session.isActive),
          balance: new FormControl(session.balance, [
            Validators.required,
            Validators.minLength(2),
            Validators.min(50),
          ]),
          credit: new FormControl(session.credit, [
            Validators.minLength(2),
            Validators.min(50),
          ]),
          macAdress: new FormControl(session.macAdress, [
            Validators.required,
            Validators.pattern(/^([0-9A-Za-z]{2}:){5}[0-9A-Za-z]{2}$/),
          ]),
          vlan: new FormControl(session.vlan, [
            Validators.required,
            Validators.min(1),
            Validators.maxLength(4),
          ]),
          port: new FormControl(session.port, [
            Validators.required,
            Validators.min(1),
            Validators.maxLength(3),
          ]),
          tariff: new FormControl(session.tariff, [Validators.required]),
          ipType: new FormControl(session.ipType, [Validators.required]),
          // ipAddress: new FormControl(session.ipAddress || ""),
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
    const now = Date.now();
  
    // Перевіряємо, чи минуло 15 секунд з останнього виклику
    if (now - this.lastSubmitTime < 15000) {
      this.presentToast("Please wait 15 seconds before the next update", "top");
      return;
    }


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
      this.presentToast("Data Updated", "top");
      this.lastSubmitTime = Date.now();
  }

  submitLogin() {
    const now = Date.now();
    // Перевіряємо, чи минуло 15 секунд з останнього виклику
    if (now - this.lastSubmitTime < 15000) {
      this.presentToast("Please wait 15 seconds before the next update", "top");
      return;
    }


    if (this.formLogin.invalid) {
      return;
    }

    this.submited = true;

    const updatedUserLogin = {
      ...this.user,
      login: {
        login: this.formLogin.value.login,
        password: this.formLogin.value.password,
      },
    };

    this.sSub = this.userService.updateUser(updatedUserLogin).subscribe(() => {
      this.submited = false;
    });
    this.presentToast("Data Updated", "top");
    this.lastSubmitTime = Date.now();
  }

  submitSession() {
    const now = Date.now();
    if (now - this.lastSubmitTime < 15000) {
      this.presentToast("Please wait 15 seconds before the next update", "top");
      return;
    }
  
    if (this.formInternetSession.invalid) {
      return;
    }
  
    this.submited = true;
  
    // Отримуємо попередній стан isActive (або null, якщо не було)
    const previousIsActive = this.user.session ? this.user.session.isActive : null;
    const newIsActive = this.formInternetSession.value.isActive;
  
    const updateUserSession = {
      ...this.user,
      session: {
        isActive: newIsActive,
        balance: this.formInternetSession.value.balance,
        credit: this.formInternetSession.value.credit,
        macAdress: this.formInternetSession.value.macAdress,
        vlan: this.formInternetSession.value.vlan,
        port: this.formInternetSession.value.port,
        tariff: this.formInternetSession.value.tariff,
        ipType: this.formInternetSession.value.ipType,
      },
    };
  
    this.sSub = this.userService.updateUser(updateUserSession).subscribe(() => {
      this.submited = false;
      this.presentToast("Data Updated", "top");
  
      // Отримуємо лічильники
      this.userService.getCounts().subscribe((counts) => {
        if (previousIsActive === null) {
          // Якщо попереднє значення було null, просто додаємо у відповідний лічильник
          if (newIsActive) {
            counts.activeCount++;
          } else {
            counts.passiveCount++;
          }
        } else if (previousIsActive !== newIsActive) {
          // Якщо isActive змінився з true на false або навпаки
          if (newIsActive) {
            counts.activeCount++;
            counts.passiveCount = Math.max(0, counts.passiveCount - 1);
          } else {
            counts.passiveCount++;
            counts.activeCount = Math.max(0, counts.activeCount - 1);
          }
        }
  
        this.userService.updateCounts(counts).subscribe(() => {
          console.log("Лічильники успішно оновлено.");
        });
      });
    });
  
    this.lastSubmitTime = Date.now();
  }
  
  
  async presentToast(message: string, position: "top" | "middle" | "bottom") {
    const color =
      message === "User Created" || message === "Data Updated"
        ? "success-toast"
        : "error-toast";

    console.log("Toast message:", message);
    console.log("Assigned color class:", color);

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      cssClass: color,
    });

    await toast.present();
  }

  ngOnDestroy(): void {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }
}
