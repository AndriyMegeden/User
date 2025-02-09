import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  IpType,
  LoginOffice,
  SessionInterface,
  Tariff,
  UserData,
} from "@interfaces/user.interface";
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
  constructor(private userService: UserService) {}

  // запустити таймер
  startTimer() {
    if (this.timer) {
      return;
    }

    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let days = 0;

    // Запуск інтервалу, що буде оновлювати час кожну секунду
    this.timer = setInterval(() => {
      seconds++;

      if (seconds === 60) {
        seconds = 0;
        minutes++;

        if (minutes === 60) {
          minutes = 0;
          hours++;

          if (hours === 24) {
            hours = 0;
            days++;
          }
        }
      }

      // Форматуємо час у вигляді 00:00:00
      this.time = `${this.pad(days)}:${this.pad(hours)}:${this.pad(
        minutes
      )}:${this.pad(seconds)}`;
    }, 1000);
  }
  // зупинити таймер
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer); // Зупинка таймера
      this.timer = null; // Очистка змінної таймера
      this.time = "00:00:00:00"; // Обнулити відображуваний час
      console.log("Таймер зупинено");
    }
  }

  // Функція для додавання нуля перед одиничними цифрами
  private pad(number: number): string {
    return number < 10 ? "0" + number : number.toString();
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
    this.isDataInLocalStorage = JSON.parse(localStorage.getItem("isDataInLocalStorage") || "false");
   
    this.formData.valueChanges.subscribe(() => {
      if (this.formData.invalid) {
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
        this.startTimer();
      } else {
        this.stopTimer(); // Зупинка таймера, якщо форма не активна
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
    this.isDataInLocalStorage = true
    localStorage.setItem("isDataInLocalStorage", JSON.stringify(true));
    localStorage.setItem("userData", JSON.stringify(data)); // Зберігаємо всі дані
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
  }
  saveAll() {
    const storedUserData = localStorage.getItem("userData");
    const storedLoginData = localStorage.getItem("userLogin");
    const storedSessionData = localStorage.getItem("sessionData");
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserData || !storedLoginData || !storedSessionData ) {
      return;
    }

    const userData: UserData = JSON.parse(storedUserData);
    const loginData: LoginOffice = JSON.parse(storedLoginData);
    const sessionData: SessionInterface = JSON.parse(storedSessionData);

    // 1️⃣ Спочатку створюємо користувача
    this.userService.createUser(userData).subscribe(
      (newUser) => {
        if (newUser && newUser.id) {
          if (storedUserId === newUser.id) {
            console.log("Такий користувач вже є");
            return; // Виходимо з функції, не створюючи нового користувача
          }
          if (storedUserData === JSON.stringify(userData)) {
            console.log("Такий користувач вже є");
            return; // Вихід з функції, якщо користувач вже є в localStorage
          }
          
          this.userId = newUser.id;
          localStorage.setItem("userId", this.userId);

          // 2️⃣ Додаємо логін до користувача
          this.userService.createLogin(this.userId, loginData).subscribe(
            () => {
              // 3️⃣ Додаємо сесію до користувача
              this.userService
                .createSessionData(this.userId, sessionData)
                .subscribe(
                  () => {
                    // Видаляємо локальні дані
                    localStorage.removeItem("userData");
                    localStorage.removeItem("userLogin");
                    localStorage.removeItem("sessionData");

                    // Скидаємо форми
                    this.formData.reset();
                    this.formLogin.reset();
                    this.formInternetSession.reset();
                  },
                  (error) => {
                    console.error("Помилка при збереженні сесії", error);
                  }
                );
            },
            (error) => {
              console.error("Помилка при збереженні логіну", error);
            }
          );
        } else {
          console.log("Помилка: ID користувача не отримано!");
        }
      },
      (error) => {
        console.error("Помилка при створенні користувача", error);
      }
    );
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
}
