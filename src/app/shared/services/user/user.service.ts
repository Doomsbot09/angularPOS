import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiBaseUrl;
  private handleError(errRes: HttpErrorResponse){
    if(errRes.error in ErrorEvent){
      console.error("Client Side Error: ", errRes.error);
    } else {
      console.error("Server Side Error: ", errRes);
    }
    return throwError(errRes);
  }

  constructor(
    private _http: HttpClient
  ) { }


  // RETREIVE
  getAllUsers(): Observable<User[]>{
    const urlFile = 'getAllUsers';
    return this._http.get<User[]>(`${this.baseUrl}/${urlFile}`, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'NoAuth': 'False'
      })
    }).pipe(catchError(this.handleError))
  };

  // LOGIN
  authenticate(authCred): Observable<User[]>{
    const urlFile = 'authenticate';
    return this._http.post<User[]>(`${this.baseUrl}/${urlFile}`, JSON.stringify(authCred), {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'NoAuth': 'False'
      })
    }).pipe(catchError(this.handleError));
  };
  // HELPERS
  setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(){
    return JSON.parse(localStorage.getItem('user'))
  }
  setToken(token: string){
    localStorage.setItem('token', token);
  };
  getToken(){
    return localStorage.getItem('token');
  };
  deleteToken(){
    localStorage.removeItem('token');
  };
  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null
    }
  };
  isLoggedIn(){
    var usePayload = this.getUserPayload();
    if(usePayload){
      return usePayload
    } else {
      return null;
    }
  }

}
