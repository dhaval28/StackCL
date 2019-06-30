import { Injectable } from '@angular/core';

@Injectable()
export class PUserDataService {

    private data = {};

    setJSON(value) {
        this.data = value;
    }

    getJSON() {
        return this.data;
    }
}  