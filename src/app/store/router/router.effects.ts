import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Effect, Actions, ofType, EffectsModule} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';
import {RouterActionTypes, Go} from './router.actions';

@Injectable()
export class RouterEffects {
  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouterActionTypes.GO),
    map((action: Go) => {
      console.log('action ', action);
      return action.payload
    }),
    tap(({path, query: queryParams, extras}) => {
      if (queryParams) this.router.navigate(path, {queryParams, ...extras})
      this.router.navigate(path)
    })
  )

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

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }
}

