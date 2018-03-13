import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {selectAllUsers} from '../../store/users/users.selectors';
import {Observable} from 'rxjs/Observable';
import {IUser} from '../../shared/interfaces/users.interfaces';
import {NewEvent} from '../../shared/models/newEvent.model';
import {CreateEvent} from '../../store/events/events.actions';
import {AppState} from '../../app.module';


@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {

  public users$: Observable<IUser[]>;
  public name: string;
  public addEventForm: FormGroup;
  public event: NewEvent;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit() {
    this.addEventForm = this.fb.group({
      usersSelect: [[''], Validators.required],
      subject: ['', Validators.required]
    });

    this.users$ = this.store.select(selectAllUsers);

    console.log('store', this.store.select(selectAllUsers));

    this.event = new NewEvent();
  }

  onFormSubmit() {
    if (this.addEventForm.valid) {
      this.event.title = this.addEventForm.value.subject;
      this.event.attendees = this.addEventForm.value.usersSelect;
      this.store.dispatch(new CreateEvent(this.event));
    }
  }

}
