import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router"
import {AppState} from "../../../store/index"
import {Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable"
import {selectLoginState} from "../../../store/auth/auth.selectors"
import {map, take} from "rxjs/operators"
import {Go} from "../../../store/router/router.actions"

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectLoginState).pipe(
      take(1),
      map(loginState => {
        if (loginState) return  loginState
        else {
          this.store.dispatch(new Go({path: ['/calendar']}))
          return false
        }
      })
  )}

}
