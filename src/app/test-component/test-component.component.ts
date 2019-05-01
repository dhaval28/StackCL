import { Component, OnInit } from '@angular/core';
import { CommonService } from './../services/common-service';
import { CommonConstants } from './../common-constants';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  public isSignIn: boolean = true;
  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.getData(CommonConstants.testGetService).subscribe((response) => {
      console.log("working");
    });
  }

  onClickSignUp() {
    this.isSignIn = false;
  }

}
