import {AuthActionsType, AuthActionTypes} from './auth.actions'
import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"
import {Observable} from "rxjs/Observable"
import {fromPromise} from "rxjs/observable/fromPromise"

import {
  LoginFailure,
  LoginSuccess,
} from "./auth.actions"

import {of} from "rxjs/observable/of"
import * as RouterActions from "../router/router.actions"
import {RouterActionType} from "../router/router.actions"
import {catchError, map, switchMap} from "rxjs/operators"
import {from} from "rxjs/observable/from"
import {LoadersActionsType, showLoader} from "../layout/layout.actions"
import GoogleUser = gapi.auth2.GoogleUser

import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
import {AuthorizedUser} from "../../shared/models/authorizedUser"
import {parseGoogleUserResponse} from "../../shared/utils/parseGoogleUserResponse"
import {IAuthRecovery, IParsedGoogleUser} from "../../shared/interfaces/users.interfaces"

@Injectable()
export class AuthEffects {
  private SESSION_STORAGE_KEY: string = 'accessToken';

  constructor(public actions$: Actions,
              private googleAuthService: GoogleAuthService) {
  }

  @Effect()
  checkToken = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_TOKEN),
    map(() => {
      let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
      if (!token) return false
      return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    }),
    map(token => token && this.getCurrentUser()),
    switchMap((user: IParsedGoogleUser): Observable<AuthActionsType> =>
      of(!user ? new LoginFailure() : new LoginSuccess(new AuthorizedUser(user)))
    )
  )

  getCurrentUser() {
    return parseGoogleUserResponse(
      gapi.auth2.getAuthInstance().currentUser['Aia'].value
    )
  }


  @Effect({dispatch: false})
  checkTokenFailure = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_FAILURE)

  @Effect({dispatch: false})
  checkTokenSuccess = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_SUCCESS)

  @Effect()
  tryLogin = this.actions$.pipe(
    ofType(AuthActionTypes.TRY_LOGIN),
    switchMap((): Observable<IParsedGoogleUser | boolean> => this.signIn()),
    switchMap((parsedGoogleUser: IParsedGoogleUser): Observable<AuthActionsType> => {
      return of(
        parsedGoogleUser
          ? new LoginSuccess(new AuthorizedUser(parsedGoogleUser))
          : new LoginFailure()
      )
    }),
    catchError(error => {
      console.error('ERROR ', error);
      return of(new LoginFailure())
    })
  )

  @Effect()
  loginSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    switchMap((): Observable<RouterActionType | LoadersActionsType> => from([
        new RouterActions.Go({path: ['/calendar']}),
        new showLoader('globalLoader')
      ])
    )
  )

  @Effect()
  logout = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_LOGOUT),
    switchMap((): Observable<RouterActionType> => {
      sessionStorage.clear()
      return of(new RouterActions.Go({path: ['/auth']}))
    })
  )

  private signIn(): Observable<boolean> {
    return this.googleAuthService.getAuth().switchMap((auth): Observable<boolean> => {
      return fromPromise(auth.signIn().then(
        (res): IParsedGoogleUser => this.signInSuccessHandler(res),
        (err): boolean => this.signInErrorHandler(err)
      ))
    })
  }

  private signInSuccessHandler(user: GoogleUser): IParsedGoogleUser {
    const parsedGoogleUser = parseGoogleUserResponse(user)
    sessionStorage.setItem(
      this.SESSION_STORAGE_KEY, user.getAuthResponse().access_token,
    );
    return parsedGoogleUser
  }

  private signInErrorHandler(err) {
    console.warn(err);
    return false
  }
}



