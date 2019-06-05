import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data-share.service';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';
import { CommonConstants } from './../common-constants';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userData: any;
  public sidePanelSelection: number = 0;

  constructor(public _dataService: DataService, public commonService: CommonService, private router: Router, public authService: AuthenticationService) {
    this.userData = _dataService.getJSON();
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this.commonService.setData(CommonConstants.loginByToken, {}).subscribe((response) => {
        this.userData = response.user;
      });
    }
  }

  onClickLogout() {
    this.authService.logoutService();
  }

}
