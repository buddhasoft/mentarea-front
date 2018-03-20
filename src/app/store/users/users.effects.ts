import {Injectable} from "@angular/core"
import {Actions, Effect, ofType} from "@ngrx/effects"

import 'rxjs/Rx';
import {SetActiveUser, UsersActionTypes} from "./users.actions"
import {FetchEvents} from "../events/events.actions"
import {hideLoader} from "../layout/loaders/loaders.actions"
import {switchMap} from "rxjs/operators"
import {from} from "rxjs/observable/from"

@Injectable()
export class UsersEffects {
  constructor(public actions$: Actions) {
  }

  @Effect()
  setActiveUser = this.actions$.pipe(
    ofType(UsersActionTypes.SET_ACTIVE_USER),
    switchMap((action: SetActiveUser) => {
      return from([new FetchEvents(action.user.id), new hideLoader('globalLoader')])
    })
  )

}

