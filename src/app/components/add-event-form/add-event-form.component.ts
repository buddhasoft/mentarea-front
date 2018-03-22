import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Store} from "@ngrx/store"
import {selectAllUsers} from "../../store/users/users.selectors"
import {Observable} from "rxjs/Observable"
import {IUser} from "../../shared/interfaces/users.interfaces"
import {NewEvent} from "../../shared/models/newEvent.model"
import {CreateEvent} from "../../store/events/events.actions"
import {AppState} from "../../store/index"
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap"
import moment = require("moment")

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {

  users$: Observable<IUser[]>

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private activeModal: NgbActiveModal) {

  }

  ngOnInit() {
    this.addEventForm = this.fb.group({
      usersSelect: [[''], Validators.required],
      subject: ['', Validators.required]
    });

    this.users$ = this.store.select(selectAllUsers)

    this.event = new NewEvent()
  }


  name: string;
  addEventForm: FormGroup;
  event: NewEvent;

  onFormSubmit() {
    if (this.addEventForm.valid) {
      this.event.title = this.addEventForm.value.subject
      this.event.attendees = this.addEventForm.value.usersSelect
      this.store.dispatch(new CreateEvent(this.event))
      this.activeModal.close()
    }
  }

  onStartTimeChanged(newStartTime: Date){
    if (this.event.end < newStartTime) this.event.end = moment(newStartTime).add(2, 'hours');
  }

}
