import { Component, OnInit } from '@angular/core';
import { DataService } from './../services/data-share.service';
import { CommonService } from './../services/common-service';
import { CommonConstants } from './../common-constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userData: any;
  public sidePanelSelection: number = 0;

  constructor(public _dataService: DataService, public commonService: CommonService, private router: Router) {
    this.userData = _dataService.getJSON();
  }

  ngOnInit() {
  }

  onClickLogout() {
    this.commonService.setData(CommonConstants.logoutURL, {}).subscribe((response) => {
      this._dataService.setJSON({});
      this.router.navigate(['/login']);
    },
      err => {
        console.log(err);
      });
  }

}
