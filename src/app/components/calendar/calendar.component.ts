import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "../../../store/auth/auth.actions"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  viewDate: Date = new Date()

  constructor(private store: Store<{auth: object}>) { }

  ngOnInit() {
    this.store.dispatch(new authActions.CheckToken())
  }

}
