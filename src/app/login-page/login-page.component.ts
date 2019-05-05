import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common-service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CommonConstants } from './../common-constants';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public isSignIn: boolean = true;
  public contactOrFeedback: string = "contact-us-tab";
  public showSupport: boolean = false;

  public starRating: number;
  public commentInput = new FormControl('', [Validators.required]);

  public feedbackForm: FormGroup;
  constructor(public commonService: CommonService, public formBuilder: FormBuilder) { }

  ngOnInit() {
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
      if (response) {
        alert("Your response has been recorded. Thanks!!!!");
      }
      else {
        alert("Oops Something went Wrong!!!!");
      }
      this.showSupport = false;
      this.feedbackForm.reset();
    });
  }

}
