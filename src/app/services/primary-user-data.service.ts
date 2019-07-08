import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'

@Injectable()
export class PUserDataService {

    private primaryUser = new BehaviorSubject<object>({});
    primaryUserObservable = this.primaryUser.asObservable();

    constructor() {}

    updateUser(updatedUser) {
        this.primaryUser.next(updatedUser);
    }
}  