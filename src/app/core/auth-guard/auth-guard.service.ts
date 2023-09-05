import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InternalUserService } from '../../shared/internal-values/internal-user/internal-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private authenticator: InternalUserService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    let logged: boolean = this.authenticator.isAuthenticated();

    if (!logged) {
      this.router.navigate(['login']);
    }

    return logged;
  }
}
