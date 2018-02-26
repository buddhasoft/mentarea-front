import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service"
import {CalendarService} from "./services/calendar/caledar.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(authService: AuthService, calendarService: CalendarService ){
    // !authService.getToken() && authService.signIn().subscribe(
    //   value => value && console.log(' !!!!',)
    // )
  }

}
