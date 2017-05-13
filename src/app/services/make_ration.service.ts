import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class MakeRationService {

    api_url: string = '';
    
    constructor(private http: Http) {
    }

    makeration(_body: Object): Observable<any> {
        
        let url = 'http://localhost:3000/api/auth/make_ration';
        let body = JSON.stringify(_body);
        let head = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: head });
   
        return this.http.post(url, body, options)
                        .map((res: Response) => res.json())
                        .catch((error: any) => Observable.throw(error || 'Server Error'));
    }

}