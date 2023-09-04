import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatorService } from '../authenticator/authenticator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private authenticator: AuthenticatorService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    let logged: boolean = this.authenticator.isAuthenticated();

    if (!logged) {
      this.router.navigate(['login']);
    }

    return logged;
  }
}
