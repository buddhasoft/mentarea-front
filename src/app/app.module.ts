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
import {authReducer, AuthState} from "./store/auth/auth.reducer";
import {eventsReducer, EventsState} from "./store/events/events.reducer"
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DateTimePickerComponent} from './components/date-time-picker/date-time-picker.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component'
import {usersReducer, UsersState} from "./store/users/users.reducer"
import {RouterModule, RouterStateSnapshot, Routes} from "@angular/router";
import {LoginComponent} from './components/login/login.component'
import {routerReducer, RouterStateSerializer, StoreRouterConnectingModule} from "@ngrx/router-store"
import {RouterEffects} from "./store/router/router.effects";
import {AddEventFormComponent} from './components/add-event-form/add-event-form.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';
import {CustomSerializer} from "./store/router/router.serializer"

const CLIENT_ID =
  // '57344781856-5g0quuin3l845gmtjbepllpg7mir6eef.apps.googleusercontent.com'
  environment.production
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
  {path: 'calendar', component: CalendarComponent,},
  {path: 'auth', component: LoginComponent,},
  { path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  { path: '**', redirectTo:"auth"}
]

const DEV_TOOLS_MODULE = environment.production ? [] :
  [StoreDevtoolsModule.instrument()];

export interface AppState {
  router: RouterStateSnapshot,
  auth: AuthState,
  events: EventsState,
  users: UsersState
}


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DateTimePickerComponent,
    ToolbarComponent,
    LoginComponent,
    AddEventFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      router: routerReducer,
      auth: authReducer,
      events: eventsReducer,
      users: usersReducer
    }),
    EffectsModule.forRoot([
      RouterEffects,
      AuthEffects,
      EventsEffects,
      UsersEffects
    ]),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: false }
      // { enableTracing: true }
    ),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    ...DEV_TOOLS_MODULE,
    CalendarModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    CalendarService,
    NgbModal,
  ],
  entryComponents: [
    AddEventFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
