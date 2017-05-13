import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class DishesListService {
  api_url: string = '';

  constructor(private http: Http) {
  }

  disheslist(): Observable<any> {
    let url = 'http://localhost:3000/api/dish/posts/1';
    let head = new Headers({'Content-Type': 'application/json'});
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server Error'));

  }
}
