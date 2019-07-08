import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonConstants } from './../common-constants';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';
import { PUserDataService } from '../services/primary-user-data.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  animations: [
    trigger('slideInAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s', style({ transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginPageComponent implements OnInit {

  public isSignIn: boolean = true;
  public contactOrFeedback: string = "contact-us-tab";
  public showSupport: boolean = false;
  public showForgotPassword: boolean = false;

  public starRating: number;
  public commentInput = new FormControl('', [Validators.required]);

  public feedbackForm: FormGroup;
  constructor(public commonService: CommonService, public formBuilder: FormBuilder, private router: Router, public _pUserDataService: PUserDataService,
    public _loader: Ng4LoadingSpinnerService, public _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this.commonService.setData(CommonConstants.loginByToken, {}).subscribe((response) => {
        this._pUserDataService.updateUser(response.user);
        this.router.navigate(['/home/dashboard']);
      });
    }
  }

  onClickSignUp() {
    this.isSignIn = false;
  }

  onClickSupport() {
    this.commentInput.reset();
    this.contactOrFeedback = "contact-us-tab";
    this.showSupport = !this.showSupport;
  }

  contactOrFeedbackChange(e) {
    this.contactOrFeedback = e.target.id;
  }

  getRating(e) {
    this.starRating = e.rating;
  }

  onClickBack() {
    if (this.showForgotPassword) {
      this.showForgotPassword = !this.showForgotPassword;
    }
    this.isSignIn = true;
  }

  forgotPasswordClicked() {
    this.showForgotPassword = true;
    this.isSignIn = false;
  }

  onClickFeedbackSubmit() {
    this.feedbackForm = this.formBuilder.group({
      commentInput: this.commentInput,
      starRating: this.starRating ? this.starRating : 0
    });

    if (this.feedbackForm.invalid) {
      return;
    }

    this._loader.show();
    this.commonService.setData(CommonConstants.feedbackURL, this.feedbackForm.value).subscribe((response) => {
      this._loader.hide();
      this._snackBar.open('Your response has been recorded. Thanks!!!!', '', {
        duration: 1500,
      });
      this.showSupport = false;
      this.feedbackForm.reset();
    },
      err => {
        this._loader.hide();
        this._snackBar.open('Oops Something went Wrong!!!!', '', {
          duration: 1500,
        });
      });
  }

}
