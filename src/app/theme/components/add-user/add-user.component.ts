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


  constructor(private userSevice: UserService) {}

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
      this.time = '00:00:00:00'; // Обнулити відображуваний час
      console.log('Таймер зупинено');
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

    // форма підключення сесії 
    this.formInternetSession = new FormGroup({
      isActive: new FormControl(true), 
      balance: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.min(50)]), 
      credit: new FormControl(null, [Validators.minLength(2), Validators.min(50)]), 
      macAdress: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^([0-9A-Za-z]{2}:){5}[0-9A-Za-z]{2}$/) 
      ]),
      vlan: new FormControl(null, [Validators.required, Validators.min(1), Validators.maxLength(4)]), 
      port: new FormControl(null, [Validators.required, Validators.min(1), Validators.maxLength(3)]), 
      tariff: new FormControl(Tariff.Platinum, [Validators.required]), 
      ipType: new FormControl(IpType.Dynamic, [Validators.required]), 
      // ipAddress: new FormControl('', [Validators.pattern(/^(\d{1,3}\.){3}\d{1,3}$/)]), // IP-адреса (для динамічного IP)
    });

    this.formInternetSession.valueChanges.subscribe(() => {
      if (this.formInternetSession.valid && this.formInternetSession.get('isActive')?.value) {
        this.startTimer();
      }else {
        this.stopTimer(); // Зупинка таймера, якщо форма не активна
      }
    });

    // // Додамо підписку на зміни балансу
    // this.formInternetSession.get('balance').valueChanges.subscribe(balance => {
    //   if (balance > 0) {
    //     this.formInternetSession.get('credit').disable();
    //   } else {
    //     // Якщо баланс 0, ввімкнути кредит
    //     this.formInternetSession.get('credit').enable();
    //   }
    //   if(balance < 0){
    //     this.formInternetSession.get('credit').enable();
    //   }else {
    //     this.formInternetSession.get('credit').disable();
    //   }
    // });
  
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
    this.userSevice.create(data).subscribe(()=> {
      this.formData.reset()
    })
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
      // ipAddress: "192.168.0.1",
    };
    console.log(SessionData);
  }
}
