import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';
import { Router } from '@angular/router';
import { validatePassword, validateUserName } from './../validations/validations';
import { PUserDataService } from '../../services/primary-user-data.service';
import { HttpHeaders } from '@angular/common/http';
import { UsernameValidator } from './../validations/username'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public commonService: CommonService, private router: Router, public _pUserDataService: PUserDataService,
    public userNameValidator: UsernameValidator) { }

  public email = new FormControl('', [Validators.required, Validators.email]);
  public userName = new FormControl('', [Validators.required, validateUserName], this.userNameValidator.checkUsername.bind(this.userNameValidator));
  public fname = new FormControl('', [Validators.required]);
  public lname = new FormControl('');
  public passwd = new FormControl('', [Validators.required, validatePassword]);

  public signUpForm: FormGroup = this.formBuilder.group({
    firstName: this.fname,
    lastName: this.lname,
    emailId: this.email,
    userName: this.userName,
    password: this.passwd
  });

  public termsAccepted: boolean = false;

  ngOnInit() {
  }

  onClickSignUp() {
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.commonService.setData(CommonConstants.signupURL, this.signUpForm.value).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this._pUserDataService.updateUser(response.user);
      this.router.navigate(['/home/qasection']);
    },
      err => {
        alert("Something went wrong!");
      });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
