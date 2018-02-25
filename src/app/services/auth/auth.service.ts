import { Injectable } from '@angular/core';
import {GoogleAuthService} from "ng-gapi"
import GoogleUser = gapi.auth2.GoogleUser
import {Observable} from "rxjs/Observable"
import {fromPromise} from "rxjs/observable/fromPromise"
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  public static SESSION_STORAGE_KEY: string = 'accessToken';
  private user: GoogleUser;

  constructor(private googleAuth: GoogleAuthService){
  }

  public getToken(): string | boolean {
    let token: string = sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
    if (!token) return false
    return sessionStorage.getItem(AuthService.SESSION_STORAGE_KEY);
  }

  public signIn(): Observable<boolean> {
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
      AuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );
  }
}
