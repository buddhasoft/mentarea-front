import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "./store/auth/auth.actions"
import {AppState} from "./store/index"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private store: Store<AppState>){}

  ngOnInit(){
    this.store.dispatch(new authActions.CheckToken())
  }

}
