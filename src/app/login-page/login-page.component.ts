import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common-service';
import { CommonConstants } from '../common-constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public isSignIn: boolean = true;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }

  onClickSignUp() {
    this.isSignIn = false;
  }

}
