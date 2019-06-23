import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonConstants } from '../../common-constants';
import { CommonService } from '../../services/common.service';

@Injectable()
export class UsernameValidator {

  debouncer: any;
  constructor(public commonService: CommonService) {

  }

  checkUsername(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {

      this.debouncer = setTimeout(() => {

        this.commonService.setData(CommonConstants.checkUserNameAvailability, { userName: control.value }).subscribe((res) => {
          res.available ? resolve(null) : resolve({ 'usernameInUse': true });
        }, (err) => {
          resolve({ 'usernameInUse': true });
        });

      }, 700);

    });
  }

}