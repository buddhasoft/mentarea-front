import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {fromPromise} from "rxjs/observable/fromPromise"
import {GoogleApiService} from "ng-gapi"
import {Store} from "@ngrx/store"
import {AddAll, CalendarActionTypes, FetchEvents, FetchEventsSuccess} from "./calendar.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {CalendarState} from "./calendar.reducer"
import {CalendarEvent} from "../../shared/models/calendarEvent.model"
import * as events from "events"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"

@Injectable()
export class CalendarEffects{
  constructor(
    private store: Store<CalendarState>,
    public actions$: Actions,
    public gapiService: GoogleApiService,
    public calendarService: CalendarService
  ){}

  @Effect({dispatch : false})
  initCalendar = this.actions$
    .ofType(CalendarActionTypes.INIT_CALENDAR)
    .switchMap(() => this.gapiService.onLoad())
    .map(() => gapi.load('client:auth2', this.calendarService.initClient.bind(this)))

  @Effect()
  fetchEvents = this.actions$
    .ofType(CalendarActionTypes.FETCH_EVENTS)
    .switchMap((): Observable<any[]> => fromPromise(this.calendarService.fetchUpcomingEvents()))
    .map(events => events.map( event => ( new CalendarEvent(event))))
    .switchMap( (events: ICalendarEvent[]) => ([ new FetchEventsSuccess(), new AddAll(events) ]))

  @Effect()
  initCalendarSuccess = this.actions$
    .ofType(CalendarActionTypes.INIT_CALENDAR_SUCCESS)
    .switchMap( () => of(new FetchEvents()))

}