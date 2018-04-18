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
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {COLORS} from './calendar.constants';

import * as authActions from "../../store/auth/auth.actions"
import * as usersActions from "../../store/calendar/users/users.actions"

import {
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEvent
} from 'angular-calendar';
import {Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable"
import {USERS} from "../../shared/constants/users"
import {AddEventFormComponent} from "../add-event-form/add-event-form.component"
import {Subscription} from "rxjs/Subscription"
import "rxjs/add/operator/do"
import {AppState} from "../../store/index"
import {TryLogout} from "../../store/auth/auth.actions"
import {selectAuthorizedUser} from "../../store/auth/auth.selectors"
import {AuthorizedUser} from "../../shared/models/authorizedUser"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {SelectEventToEdit} from "../../store/calendar/events/events.actions"
import {AppCalendarEvent} from "../../shared/models/newEvent.model"
import {getAllUsers, getActiveUser, getAllEvents, getEventsTotal, getActiveEvent} from "../../store/selectors"
import {ConfirmComponent} from "../../shared/components/confirm/confirm/confirm.component"

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
    event: AppCalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        // this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({event}: { event: CalendarEvent }): void => {
        // this.events = this.events.filter(iEvent => iEvent !== event);
        // this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events$: Observable<AppCalendarEvent[]>
  eventsTotal$: Observable<number>
  users$: Observable<IUser[]>
  selectedUsers$: Observable<IUser>
  selectedEventSub: Subscription
  authorizedUser$: Observable<AuthorizedUser>

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
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.isLoggedInSub = this.store.select(state => state.auth.isLoggedIn).subscribe(isLoggedIn => {
      isLoggedIn && this.store.dispatch(new authActions.InitClient())
      isLoggedIn && this.store.dispatch(new usersActions.AddAllUsers(USERS))
    })

    this.events$ = this.store.select(getAllEvents)
    this.eventsTotal$ = this.store.select(getEventsTotal)
    this.users$ = this.store.select(getAllUsers)
    this.selectedUsers$ = this.store.select(getActiveUser)
    this.authorizedUser$ = this.store.select(selectAuthorizedUser)
    this.selectedEventSub = this.store.select(getActiveEvent).subscribe(event => {
      this.modalData = {...this.modalData, event}
    })
  }

  ngOnDestroy() {
    this.isLoggedInSub.unsubscribe()
    this.selectedEventSub.unsubscribe()
  }

  changeUser(user) {
    this.store.dispatch(new usersActions.SetActiveUser(user))
    this.refresh.next()
  }

  dayClicked({date, events}: { date: Date; events: AppCalendarEvent[] }): void {
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
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: AppCalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg', beforeDismiss: () => this.unselectEvent()});
  }

  unselectEvent(): boolean {
    this.store.dispatch(new SelectEventToEdit(null))
    return true
  }

  onClosePress(close) {
    this.unselectEvent()
    close()
  }

  addEvent(): void {
    const modalRef = this.modal.open(AddEventFormComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'AddEventFormComponent';
  }

  editEvent($event, eventId: string): void {
    $event.preventDefault()
    const modalRef = this.modal.open(AddEventFormComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'AddEventFormComponent';
    this.store.dispatch(new SelectEventToEdit(eventId))
  }

  quit() {
    const modalRef = this.modal.open(ConfirmComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'ConfirmComponent';
    this.store.dispatch(new TryLogout())
  }
}
