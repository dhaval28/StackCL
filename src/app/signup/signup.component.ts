import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormControlName } from '@angular/forms';


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
    fname: this.fname,
    email: this.email,
    passwd: this.passwd
  });

  public termsAccepted: boolean = false;
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
