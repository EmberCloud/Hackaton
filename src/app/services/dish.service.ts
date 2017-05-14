import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class DishService {


    
    constructor(private http: Http) {
    }

    addDish(_body: Object): Observable<any> {
        
        console.log(_body);

        let url = 'http://localhost:3000/api/dish/add';
        let body = JSON.stringify(_body);
        let head = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: head });
   
        return this.http.post(url, body, options)
                        .map((res: Response) => {
                            res.json();    
                        })
                        .catch((error: any) => {
                            return Observable.throw(error || 'Server Error');
                        });

    }

    getRation(_body) {
        console.log(_body);
        let url = 'http://localhost:3000/api/dish/make_ration/settings';
        let body = JSON.stringify(_body);
        let head = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: head });

        return this.http.post(url, body, options)
                        .map((res: Response) => {
                            res.json();    
                        })
                        .catch((error: any) => {
                            return Observable.throw(error || 'Server Error');
                        });
    }

    
}