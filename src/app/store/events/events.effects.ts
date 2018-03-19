import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {fromPromise} from "rxjs/observable/fromPromise"
import {AddAll, AddOne, CreateEvent, EventsActionTypes, FetchEvents, FetchEventsSuccess} from "./events.actions"
import {Observable} from "rxjs/Observable"
import {CalendarService} from "../../services/calendar/caledar.service"
import {CalendarEvent} from "../../shared/models/calendarEvent.model"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {SetActiveUser} from "../users/users.actions"
import {COMMON_USER} from "../../shared/constants/users"
import {switchMap} from "rxjs/operators"

@Injectable()
export class EventsEffects {
  constructor(public actions$: Actions,
              public calendarService: CalendarService) {
  }

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
  initCalendarSuccess = this.actions$.pipe(
    ofType(EventsActionTypes.INIT_CALENDAR_SUCCESS),
    switchMap(() => of(new SetActiveUser(COMMON_USER)))
  )


  @Effect()
  createEvent = this.actions$
    .ofType(EventsActionTypes.CREATE_EVENT)
    .switchMap(({event}: CreateEvent) => fromPromise(this.calendarService.createEvent(event)))
    .map(event => new CalendarEvent(event))
    .switchMap(event => of(new AddOne(event)))
}

