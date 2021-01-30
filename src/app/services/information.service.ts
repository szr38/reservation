import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventApi, EventInput } from '@fullcalendar/angular';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../shared/interface/user'

@Injectable({
  providedIn: 'root'
})
export class InformationService {


  INITIAL_EVENTS: EventInput[];

  user: User;

  constructor(private http: HttpClient) {
    this.INITIAL_EVENTS = JSON.parse(this.getLocalCalendar());
    this.user = JSON.parse(this.getLocalUser());
    if (this.user == null) {
      console.log('user null', this.user);
      const temp: User = {
        address: {},
        email: '',
        id: -1,
        name: '',
        phone: '',
        username: '',
        auth: false,
      };
      localStorage.setItem('user', JSON.stringify(temp));
    }
  }

  getLocalCalendar(): any {
    return localStorage.getItem('infoCalendar');
  }

  getLocalUser(): any {
    return localStorage.getItem('user');
  }

  getInitialEvents() {
    this.INITIAL_EVENTS = JSON.parse(this.getLocalCalendar())
    return this.INITIAL_EVENTS;
  }

  getAuth() {
    return this.user.auth;
  }

  getInforUser(){
    this.user = JSON.parse(this.getLocalUser());
    return this.user;
  }

  login(email: any, password: any): any {
    return new Promise(resolve => {
      this.getUsers().subscribe(res => {
        console.log('res de servidor', res);
        res.forEach((element: any) => {
          if (element.email === email && password == '123') {
            this.user = element;
            this.user.auth = true;
            console.log('user', this.user);
            localStorage.setItem('user', JSON.stringify(this.user));
            resolve(true)
          }
        });
        resolve(false)
      }, err => {
        console.log("ERRor login", err)
      });
    });

  }

  logOut() {
    localStorage.removeItem("user");
  }




  getUsers(): Observable<any> {
    const temp = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(temp)
      .pipe(retry(1),
        catchError(this.errorHandl)
      )
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;// Get client-side error
    } else {
      errorMessage = error; // Get server-side error
    }
    return throwError(errorMessage);
  }
}