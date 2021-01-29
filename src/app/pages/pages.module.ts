import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { MaterialModule } from '../shared/material/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './login/login.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])



@NgModule({
  declarations: [CalendarComponent, LoginComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
  ]
})
export class PagesModule { }
