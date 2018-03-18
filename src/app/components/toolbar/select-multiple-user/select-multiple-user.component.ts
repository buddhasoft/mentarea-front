import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../../shared/interfaces/users.interfaces"

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-select-multiple-user',
  templateUrl: './select-multiple-user.component.html',
  styleUrls: ['./select-multiple-user.component.css']
})
export class SelectMultipleUserComponent implements OnInit {

  @Input() users: IUser[];
  @Input() selectedUser: IUser;
  @Output() changeUser: EventEmitter<IUser> = new EventEmitter()


  constructor() { }

  ngOnInit() {
  }


  onChangeUser(user){
    this.changeUser.emit(user)
  }

}
