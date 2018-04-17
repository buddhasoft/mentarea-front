import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"

import * as fromEvents from "./events.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {SetActiveUser} from "../users/users.actions"
import {COMMON_USER} from "../../shared/constants/users"
import {map, pluck, switchMap} from "rxjs/operators"
import {AppCalendarEvent} from "../../shared/models/newEvent.model"

@Injectable()
export class EventsEffects {
  constructor(public actions$: Actions,
              public calendarService: CalendarService) {
  }

  @Effect()
  fetchEvents = this.actions$.pipe(
    ofType(fromEvents.EventsActionTypes.FETCH_EVENTS),
    switchMap((action: fromEvents.FetchEvents): Observable<any> =>
      this.calendarService.callGapiMethod('fetchUpcomingEvents', action.id)
    ),
    pluck<any, any[]>('items'),
    map((events = []) => events.map(event => ( new AppCalendarEvent(event) ))),
    switchMap((events: ICalendarEvent[]) => ([new fromEvents.FetchEventsSuccess(), new fromEvents.AddAll(events)]))
  )

  @Effect()
  initCalendarSuccess = this.actions$.pipe(
    ofType(fromEvents.EventsActionTypes.INIT_CALENDAR_SUCCESS),
    map(() => new SetActiveUser(COMMON_USER))
  )

  @Effect()
  createEvent = this.actions$.pipe(
    ofType(fromEvents.EventsActionTypes.CREATE_EVENT),
    switchMap(({event}: fromEvents.CreateEvent): Observable<any> =>
      this.calendarService.callGapiMethod('createEvent', {event})
    ),
    map(event => new AppCalendarEvent(event)),
    map(event => new fromEvents.AddOne(event))
  )

  @Effect()
  updateEvent = this.actions$.pipe(
    ofType(fromEvents.EventsActionTypes.UPDATE_EVENT),
    switchMap(({event}: fromEvents.CreateEvent): Observable<any> =>
      this.calendarService.callGapiMethod('updateEvent', {event})
    ),
    map(event => new AppCalendarEvent(event)),
    map(event => new fromEvents.UpdateOne(event.id, event))
  )
}
