import {
  Component,
  ChangeDetectionStrategy,
  ViewChild, ChangeDetectorRef,
  TemplateRef, OnInit, OnDestroy, ApplicationRef, NgZone
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {Subject} from 'rxjs/Subject';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {COLORS} from './calendar.constants';

import * as calendarActions from "../../store/events/events.actions"
import * as usersActions from "../../store/users/users.actions"
import {selectAllEvents} from "../../store/events/events.selectors"
import {selectActiveUser, selectAllUsers} from "../../store/users/users.selectors"

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable"
import {USERS} from "../../shared/constants/users"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {AddEventFormComponent} from "../add-event-form/add-event-form.component"
import {Subscription} from "rxjs/Subscription"
import "rxjs/add/operator/do"
import {AppState} from "../../store/index"
import {Logout} from "../../store/auth/auth.actions"


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('addEventForm') addEventForm: TemplateRef<any>;

  view: string = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        // this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events$: Observable<any>
  users$: Observable<IUser[]>
  selectedUsers$: Observable<IUser>

  // events: ICalendarEvent[] = [
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: COLORS.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen: boolean = true;
  isLoggedInSub: Subscription;

  constructor(private modal: NgbModal,
              private store: Store<AppState>,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log('ngOnInit ',);
    this.isLoggedInSub = this.store.select(state => state.auth.isLoggedIn).subscribe(isLoggedIn => {
      isLoggedIn && this.store.dispatch(new calendarActions.InitCalendar())
      isLoggedIn && this.store.dispatch(new usersActions.AddAll(USERS))
    })

    console.log('ngOnInit after',);

    this.events$ = this.store.select(selectAllEvents)
    this.users$ = this.store.select(selectAllUsers)
    // this.selectedUsers$ = this.store.select(selectActiveUser)
    // this.events$.concat(this.users$).delay(0).subscribe(val => this.cd.detectChanges());
  }

  ngOnDestroy() {
    this.isLoggedInSub.unsubscribe()
  }

  changeUser(user) {
    this.store.dispatch(new usersActions.SetActiveUser(user))
    this.refresh.next()
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(): void {
    const modalRef = this.modal.open(AddEventFormComponent,{ size: 'lg' });
    modalRef.componentInstance.name = 'AddEventFormComponent';
    // this.events.push({
    //   title: 'New event',
    //   start: startOfDay(new Date()),
    //   end: endOfDay(new Date()),
    //   color: COLORS.red,
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   }
    // });
    // this.refresh.next();
  }

  quit(){
    this.store.dispatch(new Logout())
  }
}
