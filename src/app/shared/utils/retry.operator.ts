import {Observable} from "rxjs/Observable";
import {delay, retryWhen, scan} from "rxjs/operators";

export function retry<T>(count: number,
                         wait: number): (source: Observable<T>) => Observable<T> {

  return retryWhen(errors => errors.pipe(
    // Each time an error occurs, increment the accumulator.
    // When the maximum number of retries have been attempted, throw the error.
    scan((qant, error) => {
      if (qant >= count) {
        throw error;
      }
      return qant + 1;
    }, 0),
    // Wait the specified number of milliseconds between retries.
    delay(wait)
  ));
}
