import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InternalRouteService {
  private currentRoute: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _router: Router) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this._router.routerState.snapshot.url;
        this.currentRoute.next(currentRoute);
      });
  }

  getCompleteCurrentRoute(): Observable<string> {
    return this.currentRoute.asObservable();
  }

  getParentCurrentRoute(): Observable<string> {
    return this.currentRoute.pipe(
      map((route) => {
        const segments = route.split('/');
        return segments[1];
      })
    );
  }

  getCustomRoute(index: number): Observable<string> {
    return this.currentRoute.pipe(
      map((route) => {
        const segments = route.split('/');
        return segments[index];
      })
    );
  }

  getLastChildCurrentRoute(): Observable<string> {
    return this.currentRoute.pipe(
      map((route) => {
        const segments = route.split('/');
        if (segments.length > 0) {
          return segments.pop() || '';
        }
        return '';
      })
    );
  }
}
