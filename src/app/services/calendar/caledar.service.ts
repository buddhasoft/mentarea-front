import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store"
import {InitCalendarSuccess} from "../../store/events/events.actions"
import {EventsState} from "../../store/events/events.reducer"
import gapiConfig from "./gapi.config"


@Injectable()
export class CalendarService {

  constructor(private store: Store<EventsState>) {}

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
      // 'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => response.result.items);
  }
}
