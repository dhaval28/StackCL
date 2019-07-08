import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { PUserDataService } from './primary-user-data.service';
import { CommonConstants } from './../common-constants';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class AuthenticationService {
    httpOptions: Object;
    constructor(public commonService: CommonService, public _pUserDataService: PUserDataService, public router: Router, public jwtHelper: JwtHelperService,
        public _loader: Ng4LoadingSpinnerService) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
    }
    logoutService() {
        this._loader.show();
        this.commonService.setData(CommonConstants.logoutURL, {}).subscribe((response) => {
            this._loader.hide();
            this.logout();
        },
            err => {
                this._loader.hide();
                console.log(err);
            });
    }

    logout() {
        localStorage.removeItem('token');
        this._pUserDataService.updateUser({});
        this.router.navigate(['/login']);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }
}
