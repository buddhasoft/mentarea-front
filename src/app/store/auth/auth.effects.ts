import {AuthActionTypes} from './auth.actions'
import {Injectable} from "@angular/core"
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
              private googleAuth: GoogleAuthService) {
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

  @Effect()
  checkTokenFailure = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_FAILURE)
    .switchMap(() => of(new TryLogin()))

  @Effect()
  checkTokenSuccess = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_SUCCESS)
    .switchMap(() => of(new LoginSuccess()))

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
    return this.googleAuth.getAuth()
      .switchMap(auth => {
        return fromPromise(auth.signIn())
      })
      .map((res: GoogleUser) => {
        this.signInSuccessHandler(res)
        return true
      })
      .catch( () => of(false))
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(
      this.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }


}
