import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig } from "ng-gapi"
import { AppComponent } from './app.component';
import { AuthService} from "./services/auth/auth.service"
import {CalendarService} from "./services/calendar/caledar.service"
import {StoreModule} from "@ngrx/store"
import {authReducer} from "../store/auth/auth.reducer";
import { CalendarComponent } from './components/calendar/calendar.component'

let gapiClientConfig: NgGapiClientConfig = {
  // key: 'AIzaSyDGe0IAMJilnIpQYapviFBjO8rQppho3mA',
  client_id: "57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: [
    "https://www.googleapis.com/auth/calendar"
  ].join(" ")
};


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    StoreModule.forRoot({auth: authReducer})
  ],
  providers: [
    AuthService,
    CalendarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
