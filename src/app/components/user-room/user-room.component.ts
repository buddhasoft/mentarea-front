import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from "../../store/index"
import {Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable"
import {AppCalendarEvent} from "../../shared/models/newEvent.model"
import {selectAllEvents} from "../../store/events/events.selectors"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {authorizedUserEvents} from "../../store/selectors"
import {selectAuthorizedUser} from "../../store/auth/auth.selectors"
import {AuthorizedUser} from "../../shared/models/authorizedUser"
import {SetActiveUser} from "../../store/users/users.actions"


@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserRoomComponent implements OnInit {

  public allUserEvents$: Observable<ICalendarEvent[]>

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(selectAuthorizedUser).subscribe((user: AuthorizedUser) => {
      this.store.dispatch(new SetActiveUser({name: user.userName, id: user.email}))
      this.allUserEvents$ = this.store.select(authorizedUserEvents)
    })
  }

}
