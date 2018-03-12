import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {fromPromise} from "rxjs/observable/fromPromise"
import {GoogleApiService} from "ng-gapi"
import {Store} from "@ngrx/store"
import {
  AddAll, AddOne, CreateEvent, EventsActions, EventsActionTypes, FetchEvents,
  FetchEventsSuccess
} from "./events.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {EventsState} from "./events.reducer"
import {CalendarEvent} from "../../shared/models/calendarEvent.model"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {NewEvent} from "../../shared/models/newEvent.model"

@Injectable()
export class EventsEffects{
  constructor(
    private store: Store<EventsState>,
    public actions$: Actions,
    public gapiService: GoogleApiService,
    public calendarService: CalendarService
  ){}

  @Effect({dispatch : false})
  initCalendar = this.actions$
    .ofType(EventsActionTypes.INIT_CALENDAR)
    .switchMap(() => this.gapiService.onLoad())
    .map(() => gapi.load('client:auth2', this.calendarService.initClient.bind(this)))

  @Effect()
  fetchEvents = this.actions$
    .ofType(EventsActionTypes.FETCH_EVENTS)
    .switchMap((action : FetchEvents): Observable<any[]> =>
      fromPromise(this.calendarService.fetchUpcomingEvents(action.id))
    )
    .map(events => events.map( event => ( new CalendarEvent(event))))
    .switchMap( (events: ICalendarEvent[]) => ([ new FetchEventsSuccess(), new AddAll(events) ]))

  @Effect()
  initCalendarSuccess = this.actions$
    .ofType(EventsActionTypes.INIT_CALENDAR_SUCCESS)
    .switchMap( () => of(new FetchEvents()))

  @Effect()
  createEvent = this.actions$
    .ofType(EventsActionTypes.CREATE_EVENT)
    .switchMap( ( {event}: CreateEvent) => fromPromise(this.calendarService.createEvent(event)))
    .map(event => new CalendarEvent(event))
    .switchMap( event => of(new AddOne(event)))
}
