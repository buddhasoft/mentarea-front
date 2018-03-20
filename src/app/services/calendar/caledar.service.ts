import {Injectable, NgZone} from '@angular/core';
import {MAIN_CALENDAR_ID} from "../../shared/constants/users"
import rfc3339 from "../../shared/utils/convertDate"
import {randomId} from "../../shared/utils/randomId"
import {fromPromise} from "rxjs/observable/fromPromise"
import {backToZone} from "../../shared/utils/customLetOperators"
import {Observable} from "rxjs/Observable"


@Injectable()
export class CalendarService {

  constructor(private zone: NgZone) {
  }

  callGapiMethod<T>(name, param): Observable<T> {
    return fromPromise<T>(this[name](param)).pipe<T>(
      backToZone(this.zone)
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
    }).then(response => response.result.items).catch(err => console.error('ERROR: ', err));
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
    }).then(req => {
      return req.result
    }).catch(err => console.error('ERROR: ', err))
  }
}
