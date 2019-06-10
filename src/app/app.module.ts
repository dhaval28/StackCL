import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninComponent } from './login-page/signin/signin.component';
import { SignupComponent } from './login-page/signup/signup.component';
import { ForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { RatingComponent } from './login-page/rating/rating.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { DiscussionSectionComponent } from './home/discussion-section/discussion-section.component';
import { QASectionComponent } from './home/qa-section/qa-section.component';
import { AdminControllerComponent } from './home/admin-controller/admin-controller.component';
import { CommonService } from './services/common.service';
import { DataService } from './services/data-share.service';
import { AuthenticationService } from './services/authentication.service';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent, ForgotPasswordComponent,
    SigninComponent, DashboardComponent, DiscussionSectionComponent, QASectionComponent, AdminControllerComponent,
    SignupComponent, RatingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, MaterialModule, AngularFontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }), Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [CommonService, DataService, AuthenticationService, AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
