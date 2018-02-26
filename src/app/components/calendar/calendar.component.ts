import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "../../../store/auth/auth.actions"
import * as calendarActions from "../../../store/calendar/calendar.actions"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date()

  constructor(private store: Store<{auth: any}>) { }

  ngOnInit() {
    this.store.dispatch(new authActions.CheckToken())
    this.store.select(state =>  state.auth.get('isLoggedIn')).subscribe( isLoggedIn => {
      isLoggedIn && this.store.dispatch(new calendarActions.InitCalendar())
    })
  }

}
