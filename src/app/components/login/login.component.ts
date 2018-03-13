import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "../../store/auth/auth.actions"
import {Observable} from "rxjs/Observable"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  loading$: Observable<boolean>

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.loading$ = this.store.select(state => state.auth.loggingIn)
  }

  onLoginClick() {
    this.store.dispatch(new authActions.TryLogin())
  }

}
