import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from './../services/common-service';
import { CommonConstants } from '../common-constants';
import { Router } from '@angular/router';


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

  constructor(public formBuilder: FormBuilder, public commonService: CommonService, private router: Router) { }

  ngOnInit() {
  }

  onClickSignIn() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    this.commonService.setData(CommonConstants.loginURL, this.signInForm.value).subscribe((response) => {
      if (response) {
        this.router.navigate(['/home', response], { skipLocationChange: true });
      }
      else {
        alert("Invalid Credentials");
      }
    });
  }

}
