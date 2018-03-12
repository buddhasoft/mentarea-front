import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Store} from "@ngrx/store"
import {selectAllUsers} from "../../store/users/users.selectors"
import {Observable} from "rxjs/Observable"
import {IUser} from "../../shared/interfaces/users.interfaces"

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {

  users$: Observable<IUser[]>

  constructor(private fb: FormBuilder, private store: Store<any>) {

  }

  ngOnInit() {
    this.addEventForm = this.fb.group({
      usersSelect: [[''], Validators.required],
      subject: ['', Validators.required]
    });

    this.users$ = this.store.select(selectAllUsers)
  }


  name:string;
  addEventForm: FormGroup;

  items = [
    {name: 'One', value: 1},
    {name: 'Two', value: 2},
    {name: 'Three', value: 3}
  ];

  onFormSubmit(){
    debugger
    this.addEventForm
  }


}
