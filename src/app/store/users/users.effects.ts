import {Injectable} from "@angular/core"
import {Actions, Effect} from "@ngrx/effects"

import {of} from "rxjs/observable/of"
import 'rxjs/Rx';
import {Store} from "@ngrx/store"
import {AddAll} from "./users.actions"

@Injectable()
export class EventsEffects{
  constructor(
    public actions$: Actions,
  ){}

  @Effect()
  initCalendarSuccess = this.actions$
    // .ofType(EventsActionTypes.INIT_CALENDAR_SUCCESS)
    // .switchMap( () => of(new FetchEvents()))

}
