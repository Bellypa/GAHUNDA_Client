import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
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


  clientBooking(bookingData): Observable<any> {
    const body = JSON.stringify(bookingData);
    return this.http.post(this.config.apiUrl + 'reservations', body, this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.handleErrors));
  }



  getBarbers(id): Observable<any> {
    return this.http.get(this.config.apiUrl + 'barbers/partner/' + id, this.httpOptions)
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
