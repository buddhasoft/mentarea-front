import * as AuthActions from './auth.actions'
import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"
import {Observable} from "rxjs/Observable"
import {GoogleAuthService} from "ng-gapi"
import {fromPromise} from "rxjs/observable/fromPromise"
import GoogleUser = gapi.auth2.GoogleUser

import {
  CheckTokenFailure,
  CheckTokenSuccess, LoginFailure, LoginSuccess,
  TryLogin
} from "./auth.actions"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';

@Injectable()
export class AuthEffects {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;

  constructor(
    public actions$: Actions,
    private googleAuth: GoogleAuthService
  ){}

  @Effect()
  checkToken = this.actions$
    .ofType(AuthActions.CHECK_TOKEN)
    .map( () => {
      let token: string = sessionStorage.getItem(AuthEffects.SESSION_STORAGE_KEY);
      if (!token) return false
      return sessionStorage.getItem(AuthEffects.SESSION_STORAGE_KEY);
    })
    .switchMap( token => {
      return of(!token ? new CheckTokenFailure() : new CheckTokenSuccess())
    })

  @Effect()
  checkTokenFailure = this.actions$
    .ofType(AuthActions.CHECK_TOKEN_FAILURE)
    .switchMap(() => of(new TryLogin()))

  @Effect()
  tryLogin = this.actions$
    .ofType(AuthActions.TRY_LOGIN)
    .switchMap(() => this.signIn())
    .switchMap( result => of( result ? new LoginSuccess() : new LoginFailure()))

  private signIn(): Observable<boolean> {
  return this.googleAuth.getAuth()
    .switchMap( auth => {
      return fromPromise(auth.signIn())
    })
    .map((res: GoogleUser) => {
      this.signInSuccessHandler(res)
      return true
    })
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.user = res;
    sessionStorage.setItem(
      AuthEffects.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }


}
