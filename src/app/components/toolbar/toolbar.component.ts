import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IUser} from "../../shared/interfaces/users.interfaces"

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit {
  @Input() users: IUser[];

  constructor() { }

  ngOnInit() {
  }

}
