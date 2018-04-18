import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from "@angular/router"
import {CalendarComponent} from "../../components/calendar/calendar.component"
import {UserRoomComponent} from "../../components/user-room/user-room.component"
import {AuthGuard} from "../../services/guards/auth/auth-guard.service"


const routes: Routes = [
  {path: '', component: CalendarComponent},
  {path: 'user_room', component: UserRoomComponent},
]

export const routing: ModuleWithProviders = RouterModule.forChild(routes)
