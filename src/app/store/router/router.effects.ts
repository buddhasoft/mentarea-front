import {Injectable, NgZone} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

import {Location} from '@angular/common'

import {Effect, Actions, ofType} from '@ngrx/effects';
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
              private location: Location) {
  }


  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouterActionTypes.GO),
    map((action: Go) => action.payload),
    tap(({path, query: queryParams, extras}: RouterNavigationConfig) => {
      this.router.navigate(path, {queryParams, ...extras})
    })
  )

  @Effect({dispatch: false})
  navigateForwardOrBack$ = this.actions$.pipe(
    ofType(RouterActionTypes.BACK, RouterActionTypes.FORWARD),
    tap(action => {
      action.type === RouterActionTypes.BACK
        ? this.location.back()
        : this.location.forward()
    })
  );

}

