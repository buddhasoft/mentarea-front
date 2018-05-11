import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GoogleApiModule, NG_GAPI_CONFIG, NgGapiClientConfig} from "ng-gapi"
import {AppComponent} from './app.component';
import {CalendarService} from "./services/calendar/caledar.service"
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from './components/login/login.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {HttpClientModule} from '@angular/common/http';
import {SocialLoginModule} from "angular4-social-login";
import {CLIENT_ID} from "./shared/constants/gapi.config"
import {APP_STORE_MODULE, customSerializer, reducerProvider} from "./store/index"
import {AuthGuard} from "./services/guards/auth/auth-guard.service";
import {AuthService} from "./services/auth/auth.service";
import {GlobalLoaderComponent} from './shared/components/global-loader/global-loader.component';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: CLIENT_ID,
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: [
    "https://www.googleapis.com/auth/calendar"
  ].join(" ")
};

const appRoutes: Routes = [
  {path: 'calendar', canActivate: [AuthGuard], loadChildren: './modules/Calendar/calendar.module#AppCalendarModule'},
  {path: 'auth', component: LoginComponent,},
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
    LoginComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {useHash: false}),
    ...APP_STORE_MODULE,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [
    reducerProvider,
    customSerializer,
    CalendarService,
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
