import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public isSignIn: boolean = true;
  public contactOrFeedback: string = "contact-us-tab";
  public showSupport: boolean = true;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  onClickSignUp() {
    this.isSignIn = false;
  }

  onClickSupport() {
    this.showSupport = !this.showSupport;
  }

  contactOrFeedbackChange(e) {
    this.contactOrFeedback = e.target.id;
    console.log(e);
  }

}
