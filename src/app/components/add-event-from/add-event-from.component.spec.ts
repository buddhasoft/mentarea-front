import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventFromComponent } from './add-event-from.component';

describe('AddEventFromComponent', () => {
  let component: AddEventFromComponent;
  let fixture: ComponentFixture<AddEventFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
