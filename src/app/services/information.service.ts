import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventApi, EventInput } from '@fullcalendar/angular';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InformationService {


  INITIAL_EVENTS:EventInput[];

  auth:boolean=false;

  // initUsers:any[];

  constructor(private http: HttpClient) {
    this.INITIAL_EVENTS=JSON.parse(this.getItem());
   }

   getItem():any{ 
    return localStorage.getItem('infoCalendar');
  }

  getInitialEvents(){
    return this.INITIAL_EVENTS;
  }

  setAuth(auth:boolean){
    this.auth=auth;
  }

  getAuth(){
    return this.auth;
  }

  login(email:any, password:any):any {
    return new Promise(resolve => {
      setTimeout(() => {
        (email === 'a@a.com' && password === '123')? resolve(true): resolve(false);
      }, 2000);
    });
  }






  getUsers(): Observable<any> {
    const temp = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(temp)
      .pipe(retry(1),
        catchError(this.errorHandl)
      )
  }

  errorHandl(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;// Get client-side error
    } else {
      errorMessage = error; // Get server-side error
    }
    return throwError(errorMessage);
  }
}
