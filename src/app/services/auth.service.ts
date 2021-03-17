import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AppConfig } from '../app.config';
import { map, catchError, retry } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      Accept: 'q=0.8;application/json;q=0.9'
    })
  };

  postUrl: string = this.config.apiUrl;
  constructor(
    private router: Router,
    private http: HttpClient,
    private config: AppConfig
  ) { }


  login(credentials): Observable<any> {
    const body = JSON.stringify(credentials);
    return this.http.post(this.config.apiUrl + 'users/login', body, this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.handleErrors));
  }

  setToken(token: string) {
    localStorage.setItem(this.config.JWT_Token, token);
  }


  getToken() {
    // console.log(jwt_decode(localStorage.getItem(this.config.JWT_Token)));
    return localStorage.getItem(this.config.JWT_Token) ? jwt_decode(localStorage.getItem(this.config.JWT_Token)) : null;
    // return jwt_decode(localStorage.getItem(this.config.JWT_Token));
  }


  clientSinup(credentials): Observable<any> {
    const body = JSON.stringify(credentials);
    return this.http.post(this.config.apiUrl + 'businessClients', body, this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.handleErrors));
  }


  getPartnerService() {
    return this.http.get(this.config.apiUrl + 'partnerServices', this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.handleErrors));
  }




  private handleErrors(error: HttpErrorResponse): Observable<any> {
    if (error.status > 0) {
      if (error.status > 0) {
        if (error.status === 401) {
          if (error) {
            return throwError(error.error);
          } else {
            return throwError('Unauthorized');
          }
        } else if (error.status === 500) {
          return throwError('Contact your administrator');
        } else if (error.status === 302) {
          return throwError('Already have an open session.');
        } else if (error.status === 404) {
          return throwError(error.error);
        } else {
          return throwError(error.error || 'Server error');
        }
      }
    } else {
      return throwError('Please check your connection or Contact Your administrator');
    }
  }
}
