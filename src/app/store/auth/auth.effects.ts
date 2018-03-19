import {AuthActionsType, AuthActionTypes} from './auth.actions'
import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"
import {Observable} from "rxjs/Observable"

import {LoginFailure, LoginSuccess} from "./auth.actions"

import {of} from "rxjs/observable/of"
import * as RouterActions from "../router/router.actions"
import {RouterActionType} from "../router/router.actions"
import {catchError, map, switchMap} from "rxjs/operators"
import {from} from "rxjs/observable/from"
import {LoadersActionsType, showLoader} from "../layout/layout.actions"

import {AuthorizedUser} from "../../shared/models/authorizedUser"
import {IParsedGoogleUser} from "../../shared/interfaces/users.interfaces"
import {AuthService} from "../../services/auth/auth.service"

@Injectable()
export class AuthEffects {

  constructor(public actions$: Actions,
              private authService: AuthService) {
  }

  @Effect()
  checkToken = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_TOKEN),
    map(() => this.authService.checkToken()),
    map(token => token && this.authService.getCurrentUser()),
    switchMap((user: IParsedGoogleUser): Observable<AuthActionsType> =>
      of(!user ? new LoginFailure() : new LoginSuccess(new AuthorizedUser(user)))
    )
  )

  @Effect({dispatch: false})
  checkTokenFailure = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_FAILURE)

  @Effect({dispatch: false})
  checkTokenSuccess = this.actions$
    .ofType(AuthActionTypes.CHECK_TOKEN_SUCCESS)

  @Effect()
  tryLogin = this.actions$.pipe(
    ofType(AuthActionTypes.TRY_LOGIN),
    switchMap((): Observable<IParsedGoogleUser | boolean> => this.authService.signIn()),
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

}



