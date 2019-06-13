import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userData;

  constructor(public commonService: CommonService, private http: HttpClient) {

  }
  ngOnInit() {
  }

  onClickRemovePicture() {
    this.commonService.setData(CommonConstants.removeProfilePicture, {}).subscribe((response) => {
      this.userData.avatar = undefined;
    }, err => {
      console.log(err);
    });
  }

  setProfilePicture(files) {
  
  }

}
