import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { CommonService } from './../../services/common-service';
import { CommonConstants } from './../../common-constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public email = new FormControl('', [Validators.required, Validators.email]);
  public fname = new FormControl('', [Validators.required]);
  public passwd = new FormControl('', [Validators.required]);

  public signUpForm: FormGroup = this.formBuilder.group({
    firstName: this.fname,
    lastName: this.fname,
    emailId: this.email,
    password: this.passwd
  });

  public termsAccepted: boolean = false;
  constructor(public formBuilder: FormBuilder, public commonService: CommonService, private router: Router) { }

  ngOnInit() {
  }

  onClickSignUp() {
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.commonService.setData(CommonConstants.signupURL, this.signUpForm.value).subscribe((response) => {
      if (response) {
        alert("Account Created Successfully");
      }
      else {
        alert("Something went wrong!");
      }
    });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
