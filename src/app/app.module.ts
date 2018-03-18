import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'angular-calendar';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from "ng-gapi"
import {AppComponent} from './app.component';
import {CalendarComponent} from './components/calendar/calendar.component'
import {CalendarService} from "./services/calendar/caledar.service"
import {AuthState} from "./store/auth/auth.reducer";
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
import {HttpClientModule} from '@angular/common/http';
import {CustomSerializer} from "./store/router/router.serializer"
import {SocialLoginModule} from "angular4-social-login";
import {CLIENT_ID} from "./shared/constants/gapi.config"
import {APP_STORE_MODULE} from "./store/index"
import {AuthGuard} from "./services/guards/auth/auth-guard.service";
import { UserRoomComponent } from './components/user-room/user-room.component'

let gapiClientConfig: NgGapiClientConfig = {
  client_id: CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: [
    "https://www.googleapis.com/auth/calendar"
  ].join(" ")
};

const appRoutes: Routes = [
  {path: 'calendar', canActivate: [AuthGuard], component: CalendarComponent,},
  {path: 'auth', component: LoginComponent,},
  {path: 'user-room', component: UserRoomComponent},
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: "auth"}
]

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DateTimePickerComponent,
    ToolbarComponent,
    LoginComponent,
    AddEventFormComponent,
    UserRoomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: false}
      // { enableTracing: true }
    ),
    ...APP_STORE_MODULE,
    CalendarModule.forRoot(),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [
    // {provide: AuthServiceConfig, useFactory: provideConfig},
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    CalendarService,
    AuthGuard,
    NgbModal,
  ],
  entryComponents: [
    AddEventFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
