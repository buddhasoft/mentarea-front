import {AuthService, SocialUser} from "angular4-social-login";
import {GoogleLoginProvider} from "angular4-social-login";
import {AuthActionsType, AuthActionTypes} from './auth.actions'
import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"
import {Observable} from "rxjs/Observable"
import {fromPromise} from "rxjs/observable/fromPromise"

import {
  CheckTokenFailure,
  CheckTokenSuccess,
  LoginFailure,
  LoginSuccess,
} from "./auth.actions"

import {of} from "rxjs/observable/of"
import * as RouterActions from "../router/router.actions"
import {RouterActionType} from "../router/router.actions"
import {catchError, map, switchMap} from "rxjs/operators"

@Injectable()
export class AuthEffects {
  private SESSION_STORAGE_KEY: string = 'accessToken';
  private user: SocialUser;

  constructor(public actions$: Actions,
              private authService: AuthService) {
  }

  @Effect()
  checkToken = this.actions$.pipe(
    ofType(AuthActionTypes.CHECK_TOKEN),
    map(() => {
      let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
      if (!token) return false
      return sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    }),
    switchMap((token): Observable<AuthActionsType> =>
      of(!token ? new LoginFailure() : new LoginSuccess())
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
    switchMap(() => this.signIn()),
    switchMap((result): Observable<AuthActionsType> =>
      of(result ? new LoginSuccess() : new LoginFailure())
    ),
    catchError(error => of(null))
  )

  @Effect()
  loginSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    switchMap((): Observable<RouterActionType> => of(new RouterActions.Go({path: ['/calendar']})))
  )

  private signIn(): Observable<boolean> {
    return fromPromise(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID))
      .pipe(
        map((user: SocialUser) => {
          this.user = user
          sessionStorage.setItem(this.SESSION_STORAGE_KEY, user.authToken);
          return user && true
        })
      )
  }
}



