import {ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from "@angular/router"
import {CalendarComponent} from "../../components/calendar/calendar.component"


const routes: Routes = [
  { path: '', component:CalendarComponent}
]

export const routing:ModuleWithProviders = RouterModule.forChild(routes)
