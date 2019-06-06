import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';
import { MatTable } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-controller',
  templateUrl: './admin-controller.component.html',
  styleUrls: ['./admin-controller.component.css']
})
export class AdminControllerComponent implements OnInit {

  public feedBacksData = [];
  public displayedColumns = ['commentInput', 'starRating', 'deleteFeedback'];
  @ViewChild(MatTable) feedBacksTable: MatTable<any>;
  constructor(public commonService: CommonService, public _loader: Ng4LoadingSpinnerService, public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getDbInfo();
  }

  getDbInfo() {
    this._loader.show();
    this.commonService.getData(CommonConstants.getDbInfo).subscribe((response) => {
      this._loader.hide();
      this.feedBacksData = response;
    });
  }

  onClickDelete(rowData) {
    this._loader.show();
    this.commonService.setData(CommonConstants.deleteFeedback, rowData).subscribe((response) => {
      this._loader.hide();
      this._snackBar.open('Feedback deleted successfully', '', {
        duration: 1500,
      });
      this.feedBacksData = response;
    });
  }

}
