import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  IpType,
  LoginOffice,
  SessionInterface,
  Tariff,
  UserData,
} from "@interfaces/user.interface";
import { ToastController } from "@ionic/angular";
import { UserService } from "@services/general/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  public formData: FormGroup;
  public formLogin: FormGroup;
  public formInternetSession: FormGroup;
  public passwordShow: boolean = false;
  public time: string = "00:00:00:00"; // Стартовий час
  public timer: any = null;
  public userId: string | null = null;
  public isDataInLocalStorage: boolean = false;
  public activeCount: number = 0;
  public passiveCount: number = 0;
  constructor(
    private userService: UserService,
    private toastController: ToastController,

  ) {
    this.loadCounts(); // Завантажуємо значення при старті компонента
  }

   // Функція завантаження даних з localStorage у змінні
   loadCounts() {
    this.activeCount = Number(localStorage.getItem("activeCount")) || 0;
    this.passiveCount = Number(localStorage.getItem("passiveCount")) || 0;
  }

  

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
        Validators.pattern(/^\d{10}$/), // Валідація для номера телефону
      ]),
      email: new FormControl(null, Validators.email),
      adress: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      textarea: new FormControl(null),
    });
    // форма login даних кабінета користувача
    this.formLogin = new FormGroup({
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    // save invalid поки я не відправлю дані користувача
    this.isDataInLocalStorage = JSON.parse(
      localStorage.getItem("isDataInLocalStorage") || "false"
    );

    this.formData.valueChanges.subscribe(() => {
      if (
        this.formData.invalid ||
        this.formLogin.invalid ||
        this.formInternetSession.invalid
      ) {
        this.isDataInLocalStorage = false;
        localStorage.setItem("isDataInLocalStorage", JSON.stringify(false));
      }
    });

    // форма підключення сесії
    this.formInternetSession = new FormGroup({
      isActive: new FormControl(true),
      balance: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.min(50),
      ]),
      credit: new FormControl(null, [
        Validators.minLength(2),
        Validators.min(50),
      ]),
      macAdress: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([0-9A-Za-z]{2}:){5}[0-9A-Za-z]{2}$/),
      ]),
      vlan: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(4),
      ]),
      port: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(3),
      ]),
      tariff: new FormControl(Tariff.Platinum, [Validators.required]),
      ipType: new FormControl(IpType.Dynamic, [Validators.required]),
      // ipAddress: new FormControl('', [Validators.pattern(/^(\d{1,3}\.){3}\d{1,3}$/)]), // IP-адреса (для динамічного IP)
    });

    this.formInternetSession.valueChanges.subscribe(() => {
      if (
        this.formInternetSession.valid &&
        this.formInternetSession.get("isActive")?.value
      ) {
        // this.startTimer();
      } else {
        // this.stopTimer(); // Зупинка таймера, якщо форма не активна
      }
    });

    this.loadSavedData(); // Викликаємо метод завантаження даних при ініціалізації
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
    this.isDataInLocalStorage = true;
    localStorage.setItem("isDataInLocalStorage", JSON.stringify(true));
    localStorage.setItem("userData", JSON.stringify(data)); // Зберігаємо всі дані
    this.presentToast("Дані збережено", "top");
  }

  submitLogin() {
    if (this.formLogin.invalid) {
      return;
    }

    const loginData: LoginOffice = {
      login: this.formLogin.value.login,
      password: this.formLogin.value.password,
    };

    localStorage.setItem("userLogin", JSON.stringify(loginData)); // Зберігаємо логін у LocalStorage
    this.presentToast("Дані збережено", "top");
  }

  submitSession() {
    if (this.formInternetSession.invalid) {
      return;
    }
    const SessionData: SessionInterface = {
      balance: this.formInternetSession.value.balance,
      credit: this.formInternetSession.value.credit,
      isActive: this.formInternetSession.value.isActive,
      macAdress: this.formInternetSession.value.macAdress,
      vlan: this.formInternetSession.value.vlan,
      port: this.formInternetSession.value.port,
      tariff: this.formInternetSession.value.tariff,
      ipType: this.formInternetSession.value.ipType,
    };
    localStorage.setItem("sessionData", JSON.stringify(SessionData)); // Зберігаємо дані сесії
    this.presentToast("Дані збережено", "top");
  }

  saveAll() {
    this.isDataInLocalStorage = false;
    const storedUserData = localStorage.getItem("userData");
    const storedLoginData = localStorage.getItem("userLogin");
    const storedSessionData = localStorage.getItem("sessionData");
  
    // Перевіряємо, чи є хоча б userData, бо без нього немає сенсу створювати логін або сесію
    if (!storedUserData) {
      console.warn("Немає основних даних користувача в LocalStorage.");
      return;
    }
  
    const userData: UserData = JSON.parse(storedUserData);
    const loginData: LoginOffice | null = storedLoginData
      ? JSON.parse(storedLoginData)
      : null;
    const sessionData: SessionInterface | null = storedSessionData
      ? JSON.parse(storedSessionData)
      : null;
  
    this.userService.getByPhone(userData.telephone).subscribe(
      (existingUser) => {
        if (existingUser) {
          this.presentToast("Користувач вже існує", "top");
          return;
        }
  
        // Створюємо користувача
        this.userService.createUser(userData).subscribe(
          (newUser) => {
            if (!newUser || !newUser.id) {
              console.error("Помилка: ID користувача не отримано!");
              this.presentToast("Помилка при створенні користувача", "top");
              return;
            }
  
            this.userId = newUser.id;
            localStorage.setItem("userId", this.userId);
            this.presentToast("Користувача Створено", "top");
  
            // Якщо є логін, створюємо логін
            if (loginData) {
              this.userService.createLogin(this.userId, loginData).subscribe({
                error: (err) => console.error("Помилка при збереженні логіну:", err),
              });
            }
  
            // Якщо є сесія, створюємо сесію
            if (sessionData) {
              this.userService.createSessionData(this.userId, sessionData).subscribe({
                error: (err) => console.error("Помилка при збереженні сесії:", err),
              });
            }
  
            // Оновлюємо глобальний лічильник у Firebase
            this.userService.getCounts().subscribe((counts) => {
              if (!counts) {
                counts = { activeCount: 0, passiveCount: 0 };
              }
  
              if (sessionData?.isActive) {
                counts.activeCount++;
              } else {
                counts.passiveCount++;
              }
  
              this.userService.updateCounts(counts).subscribe();
            });
          },
          (error) => {
            console.error("Помилка при створенні користувача:", error);
          }
        );
      },
      (error) => {
        console.error("Помилка при перевірці існуючого користувача:", error);
      }
    );
  
    // Видаляємо локальні дані
    localStorage.removeItem("userData");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("sessionData");
  
    // Скидаємо форми
    this.formData.reset();
    this.formLogin.reset();
    this.formInternetSession.reset();
  }
  

  loadSavedData() {
    // Завантажуємо дані користувача, якщо є
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const userData: UserData = JSON.parse(savedUserData);
      this.formData.patchValue(userData);
    }

    // Завантажуємо логін, якщо є
    const savedLoginData = localStorage.getItem("userLogin");
    if (savedLoginData) {
      const loginData: LoginOffice = JSON.parse(savedLoginData);
      this.formLogin.patchValue(loginData);
    }

    // Завантажуємо дані сесії, якщо є
    const savedSessionData = localStorage.getItem("sessionData");
    if (savedSessionData) {
      const sessionData: SessionInterface = JSON.parse(savedSessionData);
      this.formInternetSession.patchValue(sessionData);
    }
  }

  async presentToast(message: string, position: "top" | "middle" | "bottom") {
    const color =
      message === "Користувача Створено" || message === "Дані збережено"
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
}
