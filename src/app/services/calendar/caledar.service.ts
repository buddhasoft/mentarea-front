import { Injectable } from '@angular/core';
import {GoogleApiService} from "ng-gapi"

@Injectable()
export class CalendarService {

  constructor(gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe(() => {
      // debugger
      // gapi.auth2.getAuthInstance().signIn();
      gapi.load('client:auth2', this.initClient.bind(this));

      // gapi.client
      //   .calendar.events.list({
      //   'calendarId': 'primary',
      //   'timeMin': (new Date()).toISOString(),
      //   'showDeleted': false,
      //   'singleEvents': true,
      //   'maxResults': 10,
      //   'orderBy': 'startTime'
      // }).then(function (response) {
      //   const events = response.result.items;
      // });

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
      // Listen for sign-in state changes.
      // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
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
      var events = response.result.items;
      debugger
      // appendPre('Upcoming events:');

      // if (events.length > 0) {
      //   for (i = 0; i < events.length; i++) {
      //     var event = events[i];
      //     var when = event.start.dateTime;
      //     if (!when) {
      //       when = event.start.date;
      //     }
      //     appendPre(event.summary + ' (' + when + ')')
      //   }
      // } else {
      //   // appendPre('No upcoming events found.');
      // }
    });
  }
}
