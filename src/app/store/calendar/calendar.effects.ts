import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {fromPromise} from "rxjs/observable/fromPromise"
import {GoogleApiService} from "ng-gapi"
import {Store} from "@ngrx/store"
import {AddAll, CalendarActions, CalendarActionTypes, FetchEvents, FetchEventsSuccess} from "./calendar.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {CalendarState} from "./calendar.reducer"

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
    .map(events => events.map( event => ({
      id: 'asdf',
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      title: event.summary,
      color: {
        primary: '#3ee0c666',
        secondary: '#3ee0c666'
      }
    })))
    .switchMap( events => ([
        new FetchEventsSuccess(),
        new AddAll(events)
      ])
    )


  @Effect()
  initCalendarSuccess = this.actions$
    .ofType(CalendarActionTypes.INIT_CALENDAR_SUCCESS)
    .switchMap( () => of(new FetchEvents()))

}
