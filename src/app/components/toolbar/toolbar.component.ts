import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../shared/interfaces/users.interfaces"
import {AuthorizedUser} from "../../shared/models/authorizedUser"

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input() users: IUser[];
  @Input() selectedUser: IUser;
  @Input() authorizedUser: AuthorizedUser;
  @Output() changeUser: EventEmitter<IUser> = new EventEmitter()
  @Output() quit: EventEmitter<void> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onChangeUser(user){
    this.changeUser.emit(user)
  }

  onQuit(){
    this.quit.emit()
  }

}
