import {SocialUser} from "angular4-social-login";
import {GoogleLoginProvider} from "angular4-social-login";
import {AuthActionsType, AuthActionTypes} from './auth.actions'
import {Injectable, NgZone} from "@angular/core"
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
import {from} from "rxjs/observable/from"
import {LoadersActionsType, showLoader} from "../layout/layout.actions"
import GoogleUser = gapi.auth2.GoogleUser

import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";

@Injectable()
export class AuthEffects {
  private SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;

  constructor(public actions$: Actions,
              private googleAuthService: GoogleAuthService,
              private zone: NgZone) {
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
        (res): boolean => this.signInSuccessHandler(res),
        (err): boolean => this.signInErrorHandler(err)
      ))
    })
  }

  // }
  // private signIn(): Observable<boolean> {
  //   return fromPromise(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(err => {
  //     this.zone.run(() => {
  //       console.error('My error handler ', err);
  //     })
  //   }))
  //     .pipe(
  //       map((user: SocialUser) => {
  //         this.user = user
  //         sessionStorage.setItem(this.SESSION_STORAGE_KEY, user.authToken);
  //         return user && true
  //       })
  //     )
  // }

  private signInSuccessHandler(res: GoogleUser) {
    this.zone.run(() => {
      this.user = res;
      sessionStorage.setItem(
        this.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
      );
    });
    return true
  }

  private signInErrorHandler(err) {
    console.warn(err);
    return false
  }
}



