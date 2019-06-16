import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userData;
  public userDataToSave;
  setProfilePictureForm: FormGroup;
  httpOptions: Object;
  editProfileFlag: boolean = false;
  profilePictureStatus: string = '';

  constructor(public commonService: CommonService, private http: HttpClient, private formBuilder: FormBuilder, public _loader: Ng4LoadingSpinnerService) {

  }
  ngOnInit() {
    this.setProfilePictureForm = this.formBuilder.group({
      avatar: ['']
    });
  }

  onClickRemovePicture() {
    this.profilePictureStatus = 'removed';
    this.userDataToSave["avatar"] = null;
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.profilePictureStatus = 'changed';
      const file = event.target.files[0];
      this.setProfilePictureForm.get('avatar').setValue(file);
    }
  }

  onClickEditProfile() {
    this.editProfileFlag = true;
    this.userDataToSave = JSON.parse(JSON.stringify(this.userData));
    delete this.userDataToSave["avatar"];
    delete this.userDataToSave["userName"];
  }

  async onClickEditSave() {
    this.editProfileFlag = false;
    //logic to update profile picture (if changed)
    if (this.profilePictureStatus === 'changed') {
      const formData = new FormData();
      formData.append('avatar', this.setProfilePictureForm.get('avatar').value);
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this._loader.show();
      await this.http.post(CommonConstants.setProfilePicture, formData, this.httpOptions).subscribe((response) => {
      }, err => {
        alert('Oops! Something went wrong! Cannot change Profile Picture.');
      });
    }
    this._loader.show();
     await this.commonService.setData(CommonConstants.updateProfile, this.userDataToSave).subscribe((response) => {
      this._loader.hide();
      this.userData = response;
    }, err => {
      console.log(err);
    });
    this.profilePictureStatus = '';
  }

  onClickEditCancel() {
    this.editProfileFlag = false;
    this.profilePictureStatus = '';
  }

}
