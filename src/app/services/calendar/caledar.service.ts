import {Injectable, NgZone} from '@angular/core';
import {MAIN_CALENDAR_ID} from "../../shared/constants/users"
import rfc3339 from "../../shared/utils/convertDate"
import {randomId} from "../../shared/utils/randomId"
import {fromPromise} from "rxjs/observable/fromPromise"
import {backToZone} from "../../shared/utils/customLetOperators"
import {Observable} from "rxjs/Observable"
import {of} from "rxjs/observable/of"
import {catchError, pluck} from "rxjs/operators"


@Injectable()
export class CalendarService {

  constructor(private zone: NgZone) {
  }

  callGapiMethod(name, param): Observable<any> {
    return fromPromise(this[name](param)).pipe(
      backToZone(this.zone),
      pluck('result'),
      catchError(error => of(`GAPI Response Error: ${error}`)),
    )
  }

  fetchUpcomingEvents(calendarId: string = MAIN_CALENDAR_ID): Promise<any> {
    return gapi.client['calendar'].events.list({
      'calendarId': calendarId,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 30,
      'orderBy': 'startTime'
    })
  }

  createEvent({event, calendarId = MAIN_CALENDAR_ID}: { event: any, calendarId: string }) {
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
    })
  }
}
