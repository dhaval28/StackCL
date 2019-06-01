import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CommonService {
    httpOptions: Object;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': 'my-auth-token'
            })
        };
    }
    getData(url): Observable<any> {
        return this.http.get(url, this.httpOptions);
    }

    setData(url, body): Observable<any> {
        return this.http.post(url, body, this.httpOptions);
    }

    deleteData(url): Observable<any> {
        return this.http.delete(url, this.httpOptions);
    }
}
