import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoadingBar(newValue: boolean): void {
    this.loadingBarSubject.next(newValue);
  }

  getLoadingBar(): Observable<boolean> {
    return this.loadingBarSubject.asObservable();
  }
}
