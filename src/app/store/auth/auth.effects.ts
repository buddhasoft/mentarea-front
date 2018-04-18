import {AuthActionsType, AuthActionTypes, SetCurrentUserInfo} from './auth.actions'
import {Injectable, NgZone} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"
import {Observable} from "rxjs/Observable"

import {LoginFailure, LoginSuccess} from "./auth.actions"

import {of} from "rxjs/observable/of"
import * as RouterActions from "../router/router.actions"
import {RouterActionType} from "../router/router.actions"
import {catchError, map, switchMap} from "rxjs/operators"
import {from} from "rxjs/observable/from"
import {LoadersActionsType, showLoader} from "../layout/loaders/loaders.actions"

import {AuthorizedUser} from "../../shared/models/authorizedUser"
import {IParsedGoogleUser} from "../../shared/interfaces/users.interfaces"
import {AuthService} from "../../services/auth/auth.service"
import {AppState} from "../index"
import {Store} from "@ngrx/store"
import {SetActiveUser} from "../calendar/users/users.actions"
import {COMMON_USER, USERS} from "../../shared/constants/users"
import {backToAngularZone} from "../../shared/utils/customLetOperators"

@Injectable()
export class AuthEffects {

  constructor(public actions$: Actions,
              private authService: AuthService,
              private store: Store<AppState>,
              private zone: NgZone
  ) {
  }

  @Effect()
  checkToken = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_TOKEN),
    map(() => this.authService.checkToken()),
    //TODO here we should be sure about token validity
    switchMap((token: string) => of( token ? new LoginSuccess() : new LoginFailure()))
  )


  @Effect({dispatch: false})
  initClient = this.actions$.pipe(
    ofType(AuthActionTypes.INIT_CLIENT),
    switchMap(() => this.authService.getGapi()),
    map(() => {
      gapi.load('client', {
        callback: this.authService.initClient.bind(this),
        onerror: err => console.log('err ', err),
      })
    }),
  )


  @Effect()
  initClientSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.INIT_CLIENT_SUCCESS),
    map((): IParsedGoogleUser => this.authService.getParsedGoogleUser()),
    map((user: IParsedGoogleUser) => new AuthorizedUser(user)),
    switchMap((user: AuthorizedUser) => from([new SetCurrentUserInfo(user), new SetActiveUser(COMMON_USER)]))
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
    backToAngularZone(this.zone),
    switchMap((parsedGoogleUser: IParsedGoogleUser): Observable<AuthActionsType> => {
      return of(parsedGoogleUser ? new LoginSuccess() : new LoginFailure())
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



