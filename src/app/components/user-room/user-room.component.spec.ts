import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoomComponent } from './user-room.component';

describe('UserRoomComponent', () => {
  let component: UserRoomComponent;
  let fixture: ComponentFixture<UserRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
