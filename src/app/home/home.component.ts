import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data-share.service';
import { CommonService } from '../services/common.service';
import { AuthenticationService } from '../services/authentication.service';
import { CommonConstants } from './../common-constants';
import { HttpHeaders } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userData: any;
  public sidePanelSelection: number = 1;

  constructor(public _dataService: DataService, public commonService: CommonService, public authService: AuthenticationService,
    public _loader: Ng4LoadingSpinnerService, public router: Router) {
    this.userData = _dataService.getJSON();
  }

  ngOnInit() {
    if (localStorage.getItem('token') && (Object.keys(this.userData).length === 0 && this.userData.constructor === Object)) {
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this._loader.show();
      this.commonService.setData(CommonConstants.loginByToken, {}).subscribe((response) => {
        this._loader.hide();
        this.userData = response.user;
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
      this._dataService.setJSON({});
      this.router.navigate(['/login']);
    });
  }

}