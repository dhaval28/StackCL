import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { CommonConstants } from './../../common-constants';
import { Router } from '@angular/router';
import { DataService } from './../../services/data-share.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public errFlag = false;
  public successFlag = false;
  public email = new FormControl('', [Validators.required, Validators.email]);

  public forgotPasswordForm: FormGroup = this.formBuilder.group({
    emailId: this.email,
  });

  constructor(public formBuilder: FormBuilder, public commonService: CommonService, private router: Router, public _dataService: DataService) { }

  ngOnInit() {
  }

  onClickSend() {
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.commonService.setData(CommonConstants.forgotPasswordURL, this.forgotPasswordForm.value).subscribe((response) => {
      this.errFlag = false;
      this.successFlag = true;
    },
      err => {
        this.successFlag = false;
        this.errFlag = true;
      });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
