import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './post-dealers/user';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  dealers = [];
  public _dealersUrl = 'http://localhost:3000/dealers-data';
  public _salesUrl = 'http://localhost:3000/sales-data';
  public _postDealers = 'http://localhost:3000/dealers-data';
  constructor(private http: HttpClient) {}

  getDealers(): Observable<[]> {
    return this.http.get<[]>(this._dealersUrl);
  }

  getSales(): Observable<[]> {
    return this.http.get<[]>(this._salesUrl);
  } 

  enroll(user: User) {
    console.log(user);
    return this.http.post<any>(this._postDealers, user);
  }
}
 