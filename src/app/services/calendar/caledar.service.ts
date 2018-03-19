import {Injectable, NgZone} from '@angular/core';
import {Store} from "@ngrx/store"
import {MAIN_CALENDAR_ID} from "../../shared/constants/users"
import rfc3339 from "../../shared/utils/convertDate"
import {AppState} from "../../store/index"
import {randomId} from "../../shared/utils/randomId"


@Injectable()
export class CalendarService {

  constructor(private store: Store<AppState>,
              private zone: NgZone) {
  }

  fetchUpcomingEvents(calendarId: string = MAIN_CALENDAR_ID) {
    return this.zone.run(() => {
      return gapi.client['calendar'].events.list({
        'calendarId': calendarId,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 30,
        'orderBy': 'startTime'
      }).then(response => response.result.items).catch(err => console.error('ERROR: ', err));
    })
  }

  createEvent(event, calendarId: string = MAIN_CALENDAR_ID) {
    return gapi.client['calendar'].events.insert({
      'calendarId': calendarId,
      "start": {
        "dateTime": rfc3339(event.start),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      "end": {
        "dateTime": rfc3339(event.end),
        "timeZone": Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'attendees': event.attendees.map(attendee => ({email: attendee})),
      'singleEvents': true,
      'sendNotifications': true,
      'summary': event.title,
      'conferenceData': {
        createRequest: {
          conferenceSolutionKey: {
            type: 'eventHangout'
          },
          requestId: randomId()
        }
      },
      'conferenceDataVersion': 1
    }).then(req => {
      return req.result
    }).catch(err => console.error('ERROR: ', err))
  }
}
