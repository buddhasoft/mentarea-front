import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store"
import {InitCalendarSuccess} from "../../store/events/events.actions"
import {EventsState} from "../../store/events/events.reducer"
import gapiConfig from "./gapi.config"
import {MAIN_CALENDAR_ID, USERS} from "../../shared/constants/users"


@Injectable()
export class CalendarService {

  constructor(private store: Store<EventsState>) {
  }

  initClient() {
    return gapi.client.init(gapiConfig).then(() => {
      this.store.dispatch(new InitCalendarSuccess())
    })
  }

  fetchUpcomingEvents(calendarId: string = MAIN_CALENDAR_ID) {
    return gapi.client['calendar'].events.list({
      'calendarId': calendarId,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      // 'maxResults': 10,
      'orderBy': 'startTime'
    }).then(response => response.result.items);
  }

  createEvent(calendarId: string = MAIN_CALENDAR_ID) {
    return gapi.client['calendar'].events.insert({
      'calendarId': calendarId,
      "start": {
        "dateTime": "2018-03-10T23:00:00",
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      "end": {
        "dateTime": "2018-03-10T23:50:00",
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'attendees': Object.values(USERS.map(user => ({email: user.id}))),
      'singleEvents': true,
      'sendNotifications': true,
      'summary': 'test'
    }).then(req => req.result)
  }
}
