import {Injectable, NgZone} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Effect, Actions, ofType, EffectsModule} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {RouterActionTypes, Go} from './router.actions';

interface RouterNavigationConfig {
  path: any[];
  query?: object;
  extras?: NavigationExtras
}

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions,
              private router: Router,
              private location: Location,
              private zone: NgZone) {
  }


  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouterActionTypes.GO),
    map((action: Go) => action.payload),
    tap((routeConfig) => {
      if (!NgZone.isInAngularZone())
        this.zone.run(() => {
          this.routerNavigate(routeConfig)
        })
      else this.routerNavigate(routeConfig)
    })
  )

  routerNavigate({path, query: queryParams, extras}: RouterNavigationConfig) {
    if (queryParams) this.router.navigate(path, {queryParams, ...extras})
    this.router.navigate(path)
  }

  @Effect({dispatch: false})
  navigateBack$ = this.actions$.pipe(
    ofType(RouterActionTypes.BACK),
    tap(() => this.location.back())
  );

  @Effect({dispatch: false})
  navigateForward$ = this.actions$.pipe(
    ofType(RouterActionTypes.FORWARD),
    tap(() => this.location.forward())
  );

}

