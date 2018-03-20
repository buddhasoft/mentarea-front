import {Observable} from "rxjs/Observable"
import {NgZone} from "@angular/core"
import "@ngrx/core/add/operator/enterZone"

export function backToZone<T>(zone: NgZone): (source: Observable<T>) => Observable<T> {

  return (source: Observable<T>) => source.map(v => v).enterZone(zone)

}


