import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import * as moment from 'moment';
import { User } from 'src/app/shared/interface/user';
import { InformationService } from '../../services/information.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions;
  currentEvents: EventApi[] = []; // EventApi[]
  TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
  businessHours: any[];
  user: User;

  timeCount = 0;

  flagLogOut = false;
  flagReservation = false;

  INITIAL_EVENTS: EventInput[];

  height:number;

  constructor(private infor: InformationService,
    private cd: ChangeDetectorRef,
    private _router: Router,
    private _snackBar: MatSnackBar,) {
    
    if(window.innerHeight>960){
      this.height=580;
    }else{
      this.height=430;
    }
    this.user = this.infor.getInforUser();
    this.businessHours = [{
      daysOfWeek: [1],
      startTime: '08:00',
      endTime: '18:00'
    },
    {
      daysOfWeek: [2],
      startTime: '7:00',
      endTime: '18:00'
    }, {
      daysOfWeek: [3],
      startTime: '08:00',
      endTime: '18:00'
    },
    {
      daysOfWeek: [4],
      startTime: '7:00',
      endTime: '18:00'
    },
    {
      daysOfWeek: [5],
      startTime: '08:00',
      endTime: '18:00'
    },
    {
      daysOfWeek: [6],
      startTime: '08:00',
      endTime: '13:00'
    }];

    if (this.infor.getInitialEvents() === null) {
      this.INITIAL_EVENTS = [
        {
          id: '-1',
          title: 'Maria Perez',
          start: this.TODAY_STR + 'T08:00:00',
          end: this.TODAY_STR + 'T11:00:00',
          backgroundColor: "#464545",
          borderColor: "#464545",
        }
      ];
    } else {
      let temp=[{}];

      this.infor.INITIAL_EVENTS.forEach(element => {
        if (element.id == this.user.id.toString()) {
          temp.push({
            title: element.title,
            start: element.start,
            end: element.end,
            overlap: false,
            id: element.id,
            durationEditable: true,
            startEditable: true,
            constraint: 'businessHours',
            backgroundColor: "#00bfff",
            borderColor: "#00bfff",
          })
        } else {
          temp.push({
            id: element.id,
            title: element.title,
            start: element.start,
            end: element.end,
            backgroundColor: "#464545",
            borderColor: "#464545",
            overlap: false,
          });
        }
      });
      this.INITIAL_EVENTS=temp;
    }


    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay,list'
      },
      hiddenDays: [0],
      allDaySlot: false,
      height: this.height, 
      slotDuration: '01:00:00',
      slotLabelInterval: '01:00:00',
      // locale: esLocale, 
      validRange: {
        start: this.TODAY_STR,
        // end: '2021-06-01'
      },
      businessHours: this.businessHours,
      initialView: 'timeGridWeek',
      initialEvents: this.INITIAL_EVENTS,
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      // eventBorderColor:'#00bfff',
      // eventBackgroundColor:'#00bfff',
    };

  }

  
  ngOnInit(): void {
    console.log(this.TODAY_STR);
    
    
    
    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cd.detectChanges();
  }


  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (this.sameBusinessHours(selectInfo.start, selectInfo.end)
      && this.scheduleClash(selectInfo.start, selectInfo.end)
      && this.sameDay(selectInfo.start, selectInfo.end)
    ) {
      console.log("se crea evento")
      calendarApi.addEvent({
        title: this.user.name,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        overlap: false,
        id: this.user.id.toString(),
        durationEditable: true,
        startEditable: true,
        constraint: 'businessHours',
        backgroundColor: "#00bfff",
        borderColor: "#00bfff",
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log('clickInfo: ', clickInfo);
    if (clickInfo.event.id == this.user.id.toString()) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    }

  }

  handleEvents(events: EventApi[]) {
    this.timeCount = 0;
    events.forEach(element => {
      if (element.id === this.user.id.toString()) {
        this.timeCount += moment(element.end).diff(element.start, 'hour');
      }
    });
    this.currentEvents = events;
  }


  sameBusinessHours(start: Date, end: Date) {
    let flag = false;
    const startH = moment(start.getHours(), "HH:mm");
    const endH = moment(end.getHours(), "HH:mm");
    this.businessHours.forEach(element => {
      // if ((element.daysOfWeek[0] == start.getDay()) && (start.getHours() >= element.startTime.split(":")[0]) && (end.getHours() <= element.endTime.split(":")[0])) {    
      if ((element.daysOfWeek[0] == start.getDay()) && (startH.isSameOrAfter(moment(element.startTime, "HH:mm"))) && (endH.isSameOrBefore(moment(element.endTime, 'HH:mm')))) {
        flag = true
      }

    });

    if (flag == false) {
      this.openSnackBar('Please, select valid time');
    }
    return flag
  }


  scheduleClash(start: Date, end: Date) {
    let flag;
    let res;
    let temp: any[] = this.currentEvents;
    temp.forEach(element => {
      // if ((element.start.getDate() == end.getDate()) && (element.start.getMonth() == end.getMonth()) && (element.start.getFullYear() == end.getFullYear())) {
      if (moment(element.start).isSame(end, 'day')) {
        res = element.start.getHours() - end.getHours();
        if (res < 0 && element.end.getHours() > start.getHours()) {
          flag = true
        }
      }
    });

    flag = (flag == true) ? false : true;
    if (flag == false) {
      this.openSnackBar("Can't select busy hours");
    }
    return flag
  }


  sameDay(start: Date, end: Date) {
    let flag = false;

    if (moment(start).isSame(end, 'day')) {
      flag = true;
    }

    if (flag == false) {
      this.openSnackBar('Please, select valid time');
    }
    return flag;
  }


  onLogOut() {
    this.flagLogOut = true;
    this.infor.logOut();
    this._router.navigateByUrl('/login');
  }

  onReservation() {
    this.flagReservation = true;
    localStorage.setItem('infoCalendar', JSON.stringify(this.currentEvents));
    console.log('se guardo')
    setTimeout(() => {
      this.openSnackBar('Reservation successfully')
      this.flagReservation = false;
    }, 2000);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2500,
    });
  }


  deleteCalendarInfo() {
    localStorage.removeItem("infoCalendar");
  }

  test() {
    console.log('auth: ', this.infor.getAuth());
  }

}


