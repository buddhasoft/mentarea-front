import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultipleUserComponent } from './select-multiple-user.component';

describe('SelectMultipleUserComponent', () => {
  let component: SelectMultipleUserComponent;
  let fixture: ComponentFixture<SelectMultipleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMultipleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultipleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
