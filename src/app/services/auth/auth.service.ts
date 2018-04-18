import {Injectable, NgZone} from '@angular/core';
import {Observable} from "rxjs/Observable"
import {fromPromise} from "rxjs/observable/fromPromise"
import {IParsedGoogleUser} from "../../shared/interfaces/users.interfaces"
import GoogleUser = gapi.auth2.GoogleUser
import {parseGoogleUserResponse} from "../../shared/utils/parseGoogleUserResponse"
import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
import {GAPI_CONFIG} from "../../shared/constants/gapi.config"
import {GoogleApiService} from "ng-gapi"
import {AppState} from "../../store/index"
import {Store} from "@ngrx/store"
import {InitClientSuccess} from "../../store/auth/auth.actions"


@Injectable()
export class AuthService {

  constructor(private googleAuthService: GoogleAuthService,
              private gapiService: GoogleApiService,
              private zone: NgZone,
              private store: Store<AppState>) {
  }

  private SESSION_STORAGE_KEY: string = 'accessToken';

  public checkToken() {
    let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) return false
    return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
  }

  getParsedGoogleUser(): IParsedGoogleUser {
    return parseGoogleUserResponse(gapi.auth2.getAuthInstance().currentUser['Aia'].value)
  }

  getGapi(): Observable<any> {
    return this.gapiService.onLoad()
  }

  initClient() {
    gapi.client.init(GAPI_CONFIG).then(() => {
      this.zone.run(() => {
        this.store.dispatch(new InitClientSuccess())
      })
    }).catch(err => console.error('ERROR: ', err));
  }

  public signIn(): Observable<boolean | IParsedGoogleUser> {
    return this.googleAuthService.getAuth().switchMap((auth): Observable<boolean> => {
      return fromPromise(auth.signIn().then(
        (res): IParsedGoogleUser => this.signInSuccessHandler(res),
        (err): boolean => this.signInErrorHandler(err)
      ))
    })
  }

  private signInSuccessHandler(user: GoogleUser): IParsedGoogleUser {
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, user.getAuthResponse().access_token);
    return parseGoogleUserResponse(user)
  }

  private signInErrorHandler(err) {
    console.warn(err);
    return false
  }

}
