import { Injectable } from '@angular/core';
import {GoogleApiService} from "ng-gapi"

@Injectable()
export class CalendarService {

  constructor(gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe(() => {
      gapi.load('client:auth2', this.initClient.bind(this));
    })
  }

  initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA',
      clientId: '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com',
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar"
    }).then(() => {
      this.listUpcomingEvents()
    }).catch( err => console.error('ERROR: ', err))
  }

  listUpcomingEvents() {
    gapi.client['calendar'].events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      const events = response.result.items;
      debugger
    });
  }
}
