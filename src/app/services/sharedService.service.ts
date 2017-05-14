import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SharedService {

  private idSource = new Subject<string>();


  id$ = this.idSource.asObservable();

  // Service message commands
  setId(_id: string) {
    this.idSource.next(_id);
  }
}