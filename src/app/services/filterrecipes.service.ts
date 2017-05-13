import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class FilterrecipesService {

  constructor(private http: Http) {
  }

  getfilterdisheslist(_url): Observable<any> {
    return this.http.get(_url)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server Error'));

  }
}
