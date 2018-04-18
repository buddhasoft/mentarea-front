import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AppState} from "../../store/index"
import {Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"
import {selectAuthorizedUser} from "../../store/auth/auth.selectors"
import {AuthorizedUser} from "../../shared/models/authorizedUser"
import {SetActiveUser} from "../../store/calendar/users/users.actions"
import {authUserEventsFromGroup} from "../../store/selectors"
import {COMMON_USER} from "../../shared/constants/users"


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
      this.store.dispatch(new SetActiveUser(COMMON_USER))
      this.allUserEvents$ = this.store.select(authUserEventsFromGroup)
    })
  }

}
