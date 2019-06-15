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
  setProfilePictureForm: FormGroup;
  httpOptions: Object;
  constructor(public commonService: CommonService, private http: HttpClient, private formBuilder: FormBuilder, public _loader: Ng4LoadingSpinnerService) {

  }
  ngOnInit() {
    this.setProfilePictureForm = this.formBuilder.group({
      avatar: ['']
    });
  }

  onClickRemovePicture() {
    this._loader.show();
    this.commonService.setData(CommonConstants.removeProfilePicture, {}).subscribe((response) => {
      this._loader.hide();    
      this.userData.avatar = undefined;
    }, err => {
      console.log(err);
    });
  }

  setProfilePicture() {
    const formData = new FormData();
    formData.append('avatar', this.setProfilePictureForm.get('avatar').value);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    this._loader.show();
    this.http.post(CommonConstants.setProfilePicture, formData, this.httpOptions).subscribe((response) => {
      this._loader.hide();    
    }, err => {
      alert('Oops! Something went wrong! Cannot change Profile Picture.');
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.setProfilePictureForm.get('avatar').setValue(file);
    }
  }

}
