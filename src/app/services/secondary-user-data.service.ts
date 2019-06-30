import { Injectable } from '@angular/core';

@Injectable()
export class SUserDataService {

    private data = {};

    setJSON(value) {
        this.data = value;
    }

    getJSON() {
        return this.data;
    }
}  