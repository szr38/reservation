import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import * as moment from 'moment';
import {InformationService} from '../../services/information.service';


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

  timeCount=0;

  constructor(private infor: InformationService, private cd: ChangeDetectorRef) {
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

  if(this.infor.INITIAL_EVENTS===null){
    this.infor.INITIAL_EVENTS = [
      {
        id: '2',
        title: 'Maria Perez',
        start: this.TODAY_STR + 'T12:00:00',
        end: this.TODAY_STR + 'T16:00:00'
      }
    ];
  }
    

    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek,timeGridDay,list'
      },
      hiddenDays: [0],
      allDaySlot: false,
      height: 'auto',
      slotDuration: '01:00:00',
      slotLabelInterval: '01:00:00',
      // locale: esLocale, 
      validRange: {
        start: this.TODAY_STR,
        // end: '2021-06-01'
      },
      businessHours: this.businessHours,
      initialView: 'timeGridWeek',
      initialEvents: this.infor.INITIAL_EVENTS,
      weekends: true,
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      // eventBorderColor:'#00d1ce',
      // eventBackgroundColor:'#00d1ce',
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
    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (this.sameBusinessHours(selectInfo.start, selectInfo.end)
      && this.scheduleClash(selectInfo.start, selectInfo.end)
      && this.sameDay(selectInfo.start, selectInfo.end)
    ) {
      console.log("se crea evento")
      calendarApi.addEvent({
        title: 'titulo',
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        overlap: false,
        id: 'selected',
        durationEditable: true,
        startEditable: true,
        constraint: 'businessHours',
        backgroundColor: "#00d1ce",
        borderColor: "#00d1ce",
      });
    }
    // else {
    //   alert("selecciona horario valido");
    // }


    // console.log(" selectinfo:", selectInfo);
    // console.log("calendarApi:", calendarApi);
    // console.log("currentEvents:::", this.currentEvents);
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.timeCount=0;
    events.forEach(element => {
      if (element.id == 'selected') {
        this.timeCount+=moment(element.end).diff(element.start, 'hour');
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

    return flag
  }


  scheduleClash(start: Date, end: Date) {
    let flag;
    let res;
    let temp:any[]=this.currentEvents;
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
    return flag
  }

  
  sameDay(start:Date, end:Date){
    let flag=false;
    
    if(moment(start).isSame(end,'day')){
      flag=true;
    }

    return flag;
  }


  onReservation(){
    localStorage.setItem('infoCalendar', JSON.stringify(this.currentEvents));
    console.log('se guardo', )
  }

  deleteCalendarInfo(){
    localStorage.removeItem("infoCalendar");
  }

  test(){
    console.log(this.infor.getInitialEvents());
    console.log('auth: ',this.infor.getAuth());
    
  }


  // por defecto
  // title = 'reservation';



  // eventGuid = 0;
  // TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
  // INITIAL_EVENTS: EventInput[] = [
  //   {
  //     id: this.createEventId(),
  //     title: 'All-day event',
  //     start: this.TODAY_STR
  //   },
  //   {
  //     id: this.createEventId(),
  //     title: 'Timed event',
  //     start: this.TODAY_STR + 'T12:00:00'
  //   }
  // ];

  // createEventId() {
  //   return String(this.eventGuid++);
  // }

  // calendarVisible = true;
  // calendarOptions: CalendarOptions = {
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'timeGridWeek,timeGridDay,listWeek'
  //   },
  //   initialView: 'timeGridWeek',
  //   initialEvents: this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  //   eventsSet: this.handleEvents.bind(this)
  //   /* you can update a remote database when these fire:
  //   eventAdd:
  //   eventChange:
  //   eventRemove:
  //   */
  // };
  // currentEvents: EventApi[] = [];

  // handleCalendarToggle() {
  //   this.calendarVisible = !this.calendarVisible;
  // }

  // handleWeekendsToggle() {
  //   const { calendarOptions } = this;
  //   calendarOptions.weekends = !calendarOptions.weekends;
  // }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt('Please enter a new title for your event');
  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: this.createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     });
  //   }
  // }

  // handleEventClick(clickInfo: EventClickArg) {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents = events;
  // }

}


