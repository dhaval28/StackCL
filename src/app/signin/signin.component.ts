import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public username = new FormControl('', [Validators.required]);
  public passwd = new FormControl('', [Validators.required]);

  public signInForm: FormGroup = this.formBuilder.group({
    username: this.username,
    passwd: this.passwd
  });
  public submitted = false;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  onClickSignIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value))
  }

}
