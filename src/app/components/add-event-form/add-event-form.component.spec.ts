import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEventFormComponent} from './add-event-form.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateTimePickerComponent} from '../date-time-picker/date-time-picker.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {routerReducer} from '@ngrx/router-store';
import {eventsReducer} from '../../store/events/events.reducer';
import {usersReducer} from '../../store/users/users.reducer';
import {authReducer} from '../../store/auth/auth.reducer';
import {StoreModule} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {IUser} from '../../shared/interfaces/users.interfaces';

const users: any[] = [
  {
    name: 'name1',
    id: 1
  },
  {
    name: 'name2',
    id: 2
  },
  {
    name: 'name3',
    id: 3
  },
];

class FakeUsers {
  getUsers(): Observable<IUser[]> {
    return Observable.of(users);
  }
}

describe('AddEventFromComponent', () => {
  let component: AddEventFormComponent;
  let fixture: ComponentFixture<AddEventFormComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        StoreModule.forRoot({
          auth: authReducer,
          events: eventsReducer,
          users: usersReducer,
          router: routerReducer
        }),
        ReactiveFormsModule
      ],
      declarations: [
        AddEventFormComponent,
        DateTimePickerComponent
      ],
      providers: [
        NgbModal
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create content to the input', async(() => {
    const subject: string = 'Subject';

    fixture.detectChanges();
    component.addEventForm.get('usersSelect').patchValue(users[0].name);
    component.addEventForm.get('subject').patchValue(subject);
    component.onFormSubmit();
    expect(users[0].name).toEqual(component.event.attendees);
    expect(subject).toEqual(component.event.title);
  }));

  it('Should create content ', async(() => {
    console.log(users);

    function sdf(): Observable<IUser[]>  {

        return Observable.of(users);
    }

    component.users$ = sdf();
    // console.log('component.users$', component.users$);

  }));

});

