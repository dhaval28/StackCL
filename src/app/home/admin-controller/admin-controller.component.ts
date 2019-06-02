import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';

@Component({
  selector: 'app-admin-controller',
  templateUrl: './admin-controller.component.html',
  styleUrls: ['./admin-controller.component.css']
})
export class AdminControllerComponent implements OnInit {

  constructor(public commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.getDbInfo();
  }

  getDbInfo() {
    this.commonService.getData(CommonConstants.getDbInfo).subscribe((response) => {
      console.log(response);
    })
  }

}
