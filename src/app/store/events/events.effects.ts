import {Injectable, NgZone} from "@angular/core"
import {Actions, Effect, EffectsModule} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {fromPromise} from "rxjs/observable/fromPromise"
import {GoogleApiService} from "ng-gapi"
import {Store} from "@ngrx/store"
import {
  AddAll, AddOne, CreateEvent, EventsActionTypes, FetchEvents, FetchEventsSuccess} from "./events.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {CalendarEvent} from "../../shared/models/calendarEvent.model"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {AppState} from "../index"

@Injectable()
export class EventsEffects {
  constructor(private store: Store<AppState>,
              public actions$: Actions,
              private zone: NgZone,
              public gapiService: GoogleApiService,
              public calendarService: CalendarService) {
  }

  @Effect({dispatch: false})
  initCalendar = this.actions$
    .ofType(EventsActionTypes.INIT_CALENDAR)
    .switchMap(() => this.gapiService.onLoad())
    .map(() => gapi.load( 'client:auth2', this.calendarService.initClient.bind(this)))

  @Effect()
  fetchEvents = this.actions$
    .ofType(EventsActionTypes.FETCH_EVENTS)
    .switchMap((action: FetchEvents): Observable<any[]> =>
      fromPromise(this.calendarService.fetchUpcomingEvents(action.id))
    )
    .map((events = []) => {
      return events.map(event => ( new CalendarEvent(event)))
    })
    .switchMap((events: ICalendarEvent[]) => ([new FetchEventsSuccess(), new AddAll(events)]))

  @Effect()
  initCalendarSuccess = this.actions$
    .ofType(EventsActionTypes.INIT_CALENDAR_SUCCESS)
    .switchMap(() => of(new FetchEvents()))

  @Effect()
  createEvent = this.actions$
    .ofType(EventsActionTypes.CREATE_EVENT)
    .switchMap(({event}: CreateEvent) => fromPromise(this.calendarService.createEvent(event)))
    .map(event => new CalendarEvent(event))
    .switchMap(event => of(new AddOne(event)))
}

