import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx'

@Injectable()
export class FullRecipeService {
  api_url: string = '';

  constructor(private http: Http) {
  }

  getfullrecipe(recipeId): Observable<any> {
    return this.http.get(recipeId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server Error'));

  }
}
