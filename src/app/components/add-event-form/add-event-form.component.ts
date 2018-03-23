import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Store} from "@ngrx/store"
import {selectAllUsers} from "../../store/users/users.selectors"
import {Observable} from "rxjs/Observable"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {CalendarEvent} from "../../shared/models/newEvent.model"
import {CreateEvent, SelectEventToEdit, UpdateEvent} from "../../store/events/events.actions"
import {AppState} from "../../store/index"
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap"
import * as moment from 'moment';
import {getSelectedEvent} from "../../store/events/events.selectors"
import {ICalendarEvent} from "../../shared/interfaces/calendar.interfaces"


@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {

  users$: Observable<IUser[]>
  public submitted: boolean = false;
  name: string;
  addEventForm: FormGroup;
  event: CalendarEvent;
  editMode: boolean = false;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.users$ = this.store.select(selectAllUsers)

    this.store.select(getSelectedEvent).subscribe(event => {
      this.editMode = !!event
      this.event = event || new CalendarEvent()
      this.initForm(this.event)
    })

    this.onChanges()
  }

  onChanges(): void {
    this.addEventForm.get('timeDate.duration').valueChanges.subscribe(val => {
      this.onStartTimeChanged()
    });
  }

  initForm(event) {
    this.addEventForm = this.fb.group({
      usersSelect: [event.attendees.map(a => a.email) || null, Validators.required],
      subject: [event.title || null, Validators.required],
      timeDate: this.fb.group({
        duration: [this.getEventDuration(event) || 30, [
          Validators.required,
          Validators.min(0),
        ]]
      })
    });
    this.event.start = event.start
    this.onStartTimeChanged()
  }


  onFormSubmit() {
    this.submitted = true
    if (this.addEventForm.valid) {
      this.event.title = this.addEventForm.value.subject
      this.event.attendees = this.addEventForm.value.usersSelect
      this.store.dispatch(
        this.editMode
          ? new UpdateEvent(this.event)
          : new CreateEvent(this.event)
      )
      this.activeModal.close()
    }
  }

  getEventDuration(event: ICalendarEvent) {
    return moment(event.end).diff(moment(event.start), 'minutes');
  }

  onStartTimeChanged(newStartTime: Date = this.event.start) {
    const duration = this.addEventForm.get('timeDate.duration').value
    this.event.end = moment(newStartTime).add(
      duration, 'minutes'
    ).toDate();
  }


  isFieldValid(field: string) {
    return (!this.addEventForm.get(field).valid && this.addEventForm.get(field).touched) ||
      (this.addEventForm.get(field).untouched && this.submitted && this.addEventForm.get(field).value === null);
  }

}
