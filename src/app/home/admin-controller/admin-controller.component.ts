import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-admin-controller',
  templateUrl: './admin-controller.component.html',
  styleUrls: ['./admin-controller.component.css']
})
export class AdminControllerComponent implements OnInit {

  public feedBacksData = [];
  public displayedColumns = ['commentInput', 'starRating', 'deleteFeedback'];
  @ViewChild(MatTable) feedBacksTable: MatTable<any>; 
  constructor(public commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.getDbInfo();
  }

  getDbInfo() {
    this.commonService.getData(CommonConstants.getDbInfo).subscribe((response) => {
      this.feedBacksData = response;
    });
  }

  onClickDelete(rowData) {
    this.commonService.setData(CommonConstants.deleteFeedback, rowData).subscribe((response) => {
      this.feedBacksData = response;
    });
  }

}
