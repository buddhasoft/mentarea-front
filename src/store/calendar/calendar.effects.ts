import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import * as CalendarActions from "./calendar.actions"
import {fromPromise} from "rxjs/observable/fromPromise"
import {GoogleApiService} from "ng-gapi"
import {Store} from "@ngrx/store"
import {FetchEvents, FetchEventsSuccess, InitCalendarSuccess} from "./calendar.actions"
import {Observable} from "rxjs/Observable"

@Injectable()
export class CalendarEffects{
  constructor(
    public actions$: Actions,
    public gapiService: GoogleApiService,
    private store: Store<{calendar: any}>
  ){}

  @Effect({dispatch : false})
  initCalendar = this.actions$
    .ofType(CalendarActions.INIT_CALENDAR)
    .switchMap(() => this.gapiService.onLoad())
    .map(() => gapi.load('client:auth2', this.initClient.bind(this)))

  @Effect()
  fetchEvents = this.actions$
    .ofType(CalendarActions.FETCH_EVENTS)
    .switchMap((): Observable<any[]> => fromPromise(this.fetchUpcomingEvents()))
    .map(events => events.map( event => ({
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
      title: event.summary,
      color: {
        primary: 'green',
        secondary: 'green'
      }
    })))
    .switchMap( events => of(new FetchEventsSuccess(events)))


  @Effect()
  initCalendarSuccess = this.actions$
    .ofType(CalendarActions.INIT_CALENDAR_SUCCESS)
    .switchMap( () => of(new FetchEvents()))

  initClient() {
    return gapi.client.init({
      apiKey: 'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA',
      clientId: '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar"
    }).then(() => this.store.dispatch(new InitCalendarSuccess()))
  }

  fetchUpcomingEvents() {
    return gapi.client['calendar'].events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => response.result.items);
  }

}
