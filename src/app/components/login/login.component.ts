import {ApplicationRef, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "../../store/auth/auth.actions"
import {Observable} from "rxjs/Observable"
import {AppState} from "../../store/index"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>

  constructor(public store: Store<AppState>) {
  }

  ngOnInit() {
    this.loading$ = this.store.select(state => state.auth.loggingIn)
  }

  onLoginClick() {
    this.store.dispatch(new authActions.TryLogin())
  }

  ngOnDestroy() {
  }

}
