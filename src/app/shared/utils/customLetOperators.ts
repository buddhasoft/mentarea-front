import {Observable} from "rxjs/Observable"
import {NgZone} from "@angular/core"
import {catchError, map, tap} from "rxjs/operators"
import {of} from "rxjs/observable/of"


    import "@ngrx/core/add/operator/enterZone"

    export function backToAngularZone<T>(zone: NgZone): (source: Observable<T>) => Observable<T> {
      return (source: Observable<T>) => source.enterZone(zone)
        .pipe(
          tap(() => console.log('We are back in Angular zone')),
          // map(() => {...}),
          // catchError(error => of(null))
        )
    }


