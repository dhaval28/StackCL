import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonConstants } from './../common-constants';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';
import { DataService } from './../services/data-share.service';
import { Router } from '@angular/router';


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

  public starRating: number;
  public commentInput = new FormControl('', [Validators.required]);

  public feedbackForm: FormGroup;
  constructor(public commonService: CommonService, public formBuilder: FormBuilder, private router: Router, public _dataService: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.commonService.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
      };
      this.commonService.setData(CommonConstants.loginByToken, {}).subscribe((response) => {
        this._dataService.setJSON(response.user);
        this.router.navigate(['/home']);
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

  onClickFeedbackSubmit() {
    this.feedbackForm = this.formBuilder.group({
      commentInput: this.commentInput,
      starRating: this.starRating
    });

    if (this.feedbackForm.invalid) {
      return;
    }

    this.commonService.setData(CommonConstants.feedbackURL, this.feedbackForm.value).subscribe((response) => {
      alert("Your response has been recorded. Thanks!!!!");
      this.showSupport = false;
      this.feedbackForm.reset();
    },
      err => {
        alert("Oops Something went Wrong!!!!");
      });
  }

}
