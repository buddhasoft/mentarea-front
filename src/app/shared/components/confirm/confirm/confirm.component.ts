import {Component, OnInit} from '@angular/core';
import {AppState} from "../../../../store/index"
import {Store} from "@ngrx/store"
import {LogoutConfirmed} from "../../../../store/auth/auth.actions"
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap"

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private store: Store<AppState>, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  confirmQuit() {
    this.store.dispatch( new LogoutConfirmed());
    this.activeModal.close()
  }

}
