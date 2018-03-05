import {Injectable} from '@angular/core';
import {GoogleApiService} from "ng-gapi"
import {Store} from "@ngrx/store"
import {InitCalendarSuccess} from "../../store/calendar/calendar.actions"
import {CalendarState} from "../../store/calendar/calendar.reducer"
import gapiConfig from "./gapi.config"


@Injectable()
export class CalendarService {

  constructor(private store: Store<CalendarState>) {}

  initClient() {
    return gapi.client.init(gapiConfig).then(() => {
      this.store.dispatch(new InitCalendarSuccess())
    })
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
