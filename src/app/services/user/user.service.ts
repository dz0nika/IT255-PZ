import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = "http://localhost:7700/user/"

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(this.BASE_URL + "signup", user).pipe(map((response: any) => response))
  }

  updateFavorite(user: any): Observable<any> {
    return this.http.put(this.BASE_URL + "update/favorite", user).pipe(map((response: any) => response))
  }

  signin(user: any): Observable<any> {
    return this.http.post(this.BASE_URL + "signin", user).pipe(map((response: any) => response))
  }
}
