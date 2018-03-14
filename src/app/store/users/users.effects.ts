import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {SetActiveUser, UsersActionTypes} from "./users.actions"
import {FetchEvents} from "../events/events.actions"

@Injectable()
export class UsersEffects{
  constructor(
    public actions$: Actions,
  ){}

  @Effect()
  setActiveUser = this.actions$
    .ofType(UsersActionTypes.SET_ACTIVE_USER)
    .switchMap( (action: SetActiveUser) => {
      return of(new FetchEvents(action.user.id))
    })

}

