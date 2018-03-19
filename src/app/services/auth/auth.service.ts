import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable"
import {fromPromise} from "rxjs/observable/fromPromise"
import {IParsedGoogleUser} from "../../shared/interfaces/users.interfaces"
import GoogleUser = gapi.auth2.GoogleUser
import {parseGoogleUserResponse} from "../../shared/utils/parseGoogleUserResponse"
import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";

@Injectable()
export class AuthService {

  constructor(private googleAuthService: GoogleAuthService) {
  }

  private SESSION_STORAGE_KEY: string = 'accessToken';


  public checkToken() {

    let token: string = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!token) return false
    return sessionStorage.getItem(this.SESSION_STORAGE_KEY);

  }


  getCurrentUser(): IParsedGoogleUser {
    return gapi && parseGoogleUserResponse(
      gapi.auth2.getAuthInstance().currentUser['Aia'].value
    )
  }


  public signIn(): Observable<boolean> {
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
