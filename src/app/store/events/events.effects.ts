import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {
  AddAll, AddOne, CreateEvent, EventsActionTypes, FetchEvents, FetchEventsSuccess,
  UpdateOne
} from "./events.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {AppCalendarEvent} from "../../shared/models/calendarEvent.model"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {SetActiveUser} from "../users/users.actions"
import {COMMON_USER} from "../../shared/constants/users"
import {map, pluck, switchMap} from "rxjs/operators"

@Injectable()
export class EventsEffects {
  constructor(public actions$: Actions,
              public calendarService: CalendarService) {
  }

  @Effect()
  fetchEvents = this.actions$.pipe(
    ofType(EventsActionTypes.FETCH_EVENTS),
    switchMap((action: FetchEvents): Observable<any> =>
      this.calendarService.callGapiMethod('fetchUpcomingEvents', action.id)
    ),
    pluck<any, any[]>('items'),
    map((events = []) => events.map(event => ( new AppCalendarEvent(event) ))),
    switchMap((events: ICalendarEvent[]) => ([new FetchEventsSuccess(), new AddAll(events)]))
  )

  @Effect()
  initCalendarSuccess = this.actions$.pipe(
    ofType(EventsActionTypes.INIT_CALENDAR_SUCCESS),
    switchMap(() => of(new SetActiveUser(COMMON_USER)))
  )

  @Effect()
  createEvent = this.actions$.pipe(
    ofType(EventsActionTypes.CREATE_EVENT),
    switchMap(({event}: CreateEvent): Observable<any[]> =>
      this.calendarService.callGapiMethod('createEvent', {event})
    ),
    map(event => new AppCalendarEvent(event)),
    switchMap(event => of(new AddOne(event)))
  )

  @Effect()
  updateEvent = this.actions$.pipe(
    ofType(EventsActionTypes.UPDATE_EVENT),
    switchMap(({event}: CreateEvent): Observable<any[]> =>
      this.calendarService.callGapiMethod('updateEvent', {event})
    ),
    map(event => new AppCalendarEvent(event)),
    switchMap(event => of(new UpdateOne(event.id, event)))
  )
}
