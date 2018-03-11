import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store"
import * as authActions from "../../store/auth/auth.actions"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private store: Store<any>) { }

  ngOnInit() {
  }

  onLoginClick(){
    this.store.dispatch(new authActions.TryLogin())
  }

}
