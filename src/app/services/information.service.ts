import { Injectable } from '@angular/core';
import { EventApi, EventInput } from '@fullcalendar/angular';

@Injectable({
  providedIn: 'root'
})
export class InformationService {


  INITIAL_EVENTS:EventInput[];

  logged:boolean=false;

  constructor() {
    this.INITIAL_EVENTS=JSON.parse(this.getItem());
   }

   getItem():any{ 
    return localStorage.getItem('infoCalendar');
  }

  getInitialEvents(){
    return this.INITIAL_EVENTS;
  }

  setLogged(logged:boolean){
    this.logged=logged;
  }

  getLogged(){
    return this.logged;
  }
}
