import { Component, OnInit } from '@angular/core';
import { PUserDataService } from '../services/primary-user-data.service';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';
import { CommonConstants } from './../common-constants';
import { HttpHeaders } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { validatePassword, checkPasswords } from './../login-page/validations/validations';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public primaryUserData: any;
  public sidePanelSelection: number = 0;

  public newPassword = new FormControl('', [Validators.required, validatePassword]);
  public confirmPassword = new FormControl('', []);
  public changePasswordForm: FormGroup = this.formBuilder.group({
    newPassword: this.newPassword,
    confirmPassword: this.confirmPassword,
  }, {validator: checkPasswords});

  constructor(public formBuilder: FormBuilder, public _pUserDataService: PUserDataService, public commonService: CommonService, public authService: AuthenticationService,
    public _loader: Ng4LoadingSpinnerService, public router: Router) {
    this._pUserDataService.primaryUserObservable.subscribe((userData) => this.primaryUserData = userData);
  }

  ngOnInit() {
    if (localStorage.getItem('token') && (Object.keys(this.primaryUserData).length === 0 && this.primaryUserData.constructor === Object)) {
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this._loader.show();
      this.commonService.setData(CommonConstants.loginByToken, {}).subscribe((response) => {
        this._loader.hide();
        this.primaryUserData = response.user;
        this._pUserDataService.updateUser(response.user);
      });
    }
  }

  onClickLogout() {
    this.authService.logoutService();
  }

  onClickLogoutAllSessions() {
    this._loader.show();
    this.commonService.setData(CommonConstants.logoutSessionsURL, {}).subscribe((response) => {
      this._loader.hide();
      localStorage.removeItem('token');
      this._pUserDataService.updateUser({});
      this.router.navigate(['/login']);
    });
  }

  onClickChangePassword() {
    this.changePasswordForm.reset();
  }

  onClickChangePasswordConfirm() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    document.getElementById('changePasswordModal').click();
  }

}