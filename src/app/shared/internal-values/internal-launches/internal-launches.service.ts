import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Launch } from 'src/app/core/interfaces/launch.interface';

@Injectable({
  providedIn: 'root'
})
export class InternalLaunchesService {
  private internalLaunches: BehaviorSubject<Launch[] | null> = new BehaviorSubject<Launch[] | null>(null);

  constructor() { }

  setinternalLaunches(internalLaunches: Launch[] | null) {
    this.internalLaunches.next(internalLaunches);
  }

  getinternalLaunches(): Observable<Launch[] | null> {
    return this.internalLaunches.asObservable();
  }
}
