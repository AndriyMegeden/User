import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSocialUserRequest, LoginUserRequest } from '@core/auth-service/dto/user.dto';
import { AuthService } from '@core/auth-service/services/auth.service';
import { HttpErrorService } from '@core/auth-service/services/http-error.service';
import { LocalStorageService } from '@core/auth-service/services/localstorage.service';
import { ToastService } from '@services/general/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  constructor(
    private router: Router,
    private authService: AuthService,
    private localService: LocalStorageService,
    private httpErrorService: HttpErrorService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    if (this.isIOS) {
      document.body.classList.add('safe--area');
    } else {
      document.body.classList.remove('safe--area');
    }
  }


}
