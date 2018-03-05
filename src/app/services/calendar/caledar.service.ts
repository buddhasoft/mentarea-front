import {Injectable} from '@angular/core';
import {GoogleApiService} from "ng-gapi"
import {environment} from "../../../environments/environment"
import {Store} from "@ngrx/store"
import {CalendarState} from "../../store/calendar/calendar.reducer"
import {InitCalendarSuccess} from "../../store/calendar/calendar.actions"

const CLIENT_ID = environment.production
  ? '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  : '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com'

const API_KEY = environment.production
  ? 'AIzaSyBlm-TsqAHnsazKfouXDWf8RoMjYq--AUI'
  : 'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA'


@Injectable()
export class CalendarService {

  constructor(private gapiService: GoogleApiService,
              private store: Store<{ calendar: CalendarState }>) {
    gapiService.onLoad().subscribe(() => {
      gapi.load('client:auth2', this.initClient.bind(this));
    })
  }

  initClient() {
    return gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
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
