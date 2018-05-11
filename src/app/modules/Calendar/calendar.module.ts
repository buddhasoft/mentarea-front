import {InjectionToken, NgModule} from '@angular/core'
import {routing} from './calendar.routing'
import {CommonModule} from "@angular/common"
import {ToolbarComponent} from "../../components/toolbar/toolbar.component"
import {DateTimePickerComponent} from "../../components/date-time-picker/date-time-picker.component"
import {CalendarComponent} from "../../components/calendar/calendar.component"
import {UserRoomComponent} from "../../components/user-room/user-room.component"
import {SelectMultipleUserComponent} from "../../components/toolbar/select-multiple-user/select-multiple-user.component"
import {AddEventFormComponent} from "../../components/add-event-form/add-event-form.component"
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap"
import {CalendarModule} from "angular-calendar"
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from "@ngrx/store"
import {calendarReducer} from "../../store/calendar/calendar.reducer"
import {ConfirmComponent} from "../../shared/components/confirm/confirm/confirm.component"

@NgModule({
  imports: [
    routing,
    StoreModule.forFeature('calendar', calendarReducer),
    CommonModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalendarComponent,
    DateTimePickerComponent,
    ToolbarComponent,
    AddEventFormComponent,
    ConfirmComponent,
    UserRoomComponent,
    SelectMultipleUserComponent
  ],
  entryComponents: [
    AddEventFormComponent,
    ConfirmComponent
  ],
  providers: [
    NgbModal,
  ],
})

export class AppCalendarModule {
}
