import {AuthService, SocialUser} from "angular4-social-login";
import {FacebookLoginProvider, GoogleLoginProvider} from "angular4-social-login";
import {AuthActionTypes} from './auth.actions'
import {ApplicationRef, Injectable, NgZone} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"
import {Observable} from "rxjs/Observable"
import {GoogleAuthService} from "ng-gapi"
import {fromPromise} from "rxjs/observable/fromPromise"
import GoogleUser = gapi.auth2.GoogleUser

import {
  CheckTokenFailure,
  CheckTokenSuccess,
  LoginFailure,
  LoginSuccess,
  TryLogin
} from "./auth.actions"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import * as RouterActions from "../router/router.actions"
import {RouterActionType} from "../router/router.actions"

@Injectable()
export class AuthEffects {
  private SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;

  constructor(public actions$: Actions,
              private googleAuth: GoogleAuthService,
              private zone: NgZone,
              private authService: AuthService) {
  }

  @Effect()
  checkToken = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN)
    .map(() => {
      let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
      if (!token) return false
      return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    })
    .switchMap(token => {
      return of(!token ? new CheckTokenFailure() : new CheckTokenSuccess())
    })

  @Effect({dispatch: false})
  checkTokenFailure = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_FAILURE)

  @Effect({dispatch: false})
  checkTokenSuccess = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_SUCCESS)

  @Effect()
  tryLogin = this.actions$
    .ofType(AuthActionTypes.TRY_LOGIN)
    .switchMap(() => this.signIn())
    .switchMap(result => of(result ? new LoginSuccess() : new LoginFailure()))

  @Effect()
  loginSuccess = this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .switchMap((): Observable<RouterActionType> => of(new RouterActions.Go({path: ['/calendar']})))

  private signIn(): Observable<boolean> {
    return fromPromise(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID))
      .map((user: SocialUser) => {
        sessionStorage.setItem(this.SESSION_STORAGE_KEY, user.authToken);
        return user && true
      })
  }


}
