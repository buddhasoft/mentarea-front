import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "./store/auth/auth.actions"
import {AppState} from "./store/index"
import {Observable} from "rxjs/Observable"
import {getGlobalLoader} from "./store/selectors"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  globalLoaderState$: Observable<boolean>

  constructor(private store: Store<AppState>){}

  ngOnInit(){
    this.store.dispatch(new authActions.CheckToken())
    this.globalLoaderState$ = this.store.select(getGlobalLoader)
  }

}
