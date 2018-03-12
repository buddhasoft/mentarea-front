import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'angular-calendar';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from "ng-gapi"
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store"
import {CalendarComponent} from './components/calendar/calendar.component'
import {EffectsModule} from "@ngrx/effects"
import {AuthEffects} from "./store/auth/auth.effects"
import {EventsEffects} from "./store/events/events.effects"
import {UsersEffects} from "./store/users/users.effects"
import {CalendarService} from "./services/calendar/caledar.service"
import {environment} from "../environments/environment"
import {StoreDevtoolsModule} from "@ngrx/store-devtools"
import {FormsModule} from "@angular/forms"
import {authReducer} from "./store/auth/auth.reducer";
import {eventsReducer} from "./store/events/events.reducer"
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DateTimePickerComponent} from './components/date-time-picker/date-time-picker.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {usersReducer} from "./store/users/users.reducer"
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from './components/login/login.component'
import {routerReducer, StoreRouterConnectingModule} from "@ngrx/router-store"
import {RouterEffects} from "./store/router/router.effects"

const CLIENT_ID = environment.production
  ? '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  : '57344781856-79hcun89s3lsaimo8086e9pqmgo4uavv.apps.googleusercontent.com'

let gapiClientConfig: NgGapiClientConfig = {
  client_id: CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: [
    "https://www.googleapis.com/auth/calendar"
  ].join(" ")
};

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'calendar', component: CalendarComponent}

]

const DEV_TOOLS_MODULE = environment.production ? [] :
  [StoreDevtoolsModule.instrument()];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DateTimePickerComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
    StoreModule.forRoot({
      auth: authReducer,
      events: eventsReducer,
      users: usersReducer,
      router: routerReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      EventsEffects,
      UsersEffects,
      RouterEffects
    ]),
    ...DEV_TOOLS_MODULE,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    })
  ],
  providers: [
    CalendarService,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
