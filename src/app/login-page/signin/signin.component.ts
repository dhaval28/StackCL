import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { PUserDataService } from '../../services/primary-user-data.service';
import { CommonConstants } from './../../common-constants';
import { Router } from '@angular/router';
import { validatePassword } from './../validations/validations';
import { HttpHeaders } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(public formBuilder: FormBuilder, public commonService: CommonService, private router: Router, public _pUserDataService: PUserDataService,
    public _loader: Ng4LoadingSpinnerService, public _snackBar: MatSnackBar) { }

  @Output() forgotPasswordClicked = new EventEmitter();

  public username = new FormControl('', [Validators.required]);
  public passwd = new FormControl('', [Validators.required, validatePassword]);

  public signInForm: FormGroup = this.formBuilder.group({
    username: this.username,
    passwd: this.passwd
  });
  public submitted = false;

  ngOnInit() {
  }

  onClickSignIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    this._loader.show();
    this.commonService.setData(CommonConstants.loginURL, this.signInForm.value).subscribe((response) => {
      this._loader.hide();
      localStorage.setItem('token', response.token);
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this._pUserDataService.updateUser(response.user);
      this.router.navigate(['/home/dashboard']);
    },
      err => {
        this._loader.hide();
        this._snackBar.open('Invalid Credentials', '', {
          duration: 1500,
        });
      });

  }

  onClickForgotPassword() {
    this.forgotPasswordClicked.emit(true);
  }

}
