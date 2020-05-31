import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Applicant } from '../Models/applicant.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  appUrl: string;
  apiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient) {
    this.appUrl = environment.appUrl;
    this.apiUrl = 'api/Applicants/';
  }

  getApplicants(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.appUrl + this.apiUrl)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getApplicant(id: number): Observable<Applicant> {
    return this.http.get<Applicant>(this.appUrl + this.apiUrl + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saveApplicant(applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.appUrl + this.apiUrl, JSON.stringify(applicant), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateApplicant(id: number, applicant): Observable<Applicant> {
    return this.http.put<Applicant>(this.appUrl + this.apiUrl + id, JSON.stringify(applicant), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteApplicant(id: number): Observable<Applicant> {
    return this.http.delete<Applicant>(this.appUrl + this.apiUrl + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
