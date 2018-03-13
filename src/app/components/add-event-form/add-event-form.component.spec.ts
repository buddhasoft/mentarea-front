import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEventFormComponent} from './add-event-form.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('AddEventFromComponent', () => {
  let component: AddEventFormComponent;
  let fixture: ComponentFixture<AddEventFormComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEventFormComponent]
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
    const value: string [] = ['user', 'user2', 'user3'];

    fixture.detectChanges();
    component.addEventForm.get('usersSelect').patchValue(value);
    component.onFormSubmit();
    console.log(component);
    // expect(value).toEqual(component.event.attendees);
    // component.initForm();
    // expect(value).toEqual(component.userGroup.get('email').value);
  }));


});

