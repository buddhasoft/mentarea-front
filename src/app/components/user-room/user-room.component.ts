import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-room',
  templateUrl: './user-room.component.html',
  styleUrls: ['./user-room.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserRoomComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
