import { Component } from '@angular/core';
import { LoadingService } from './core/loading/loading.service';
import { ApiUsersService } from './core/api/users/api-users.service';
import { AuthenticatorService } from './core/authenticator/authenticator.service';
import { Router } from '@angular/router';
import { User } from './core/authenticator/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elenchos';
  loadingBarVisible: boolean = false;

  constructor(
    public loadingService: LoadingService,
    private internalUser: AuthenticatorService,
    private users: ApiUsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuthLocalStorage();
  }

  private isAuthLocalStorage() {
    const storedAuthToken = localStorage.getItem('authToken');

    if (storedAuthToken) {
      this.users.getUser(storedAuthToken).subscribe(
        (response: HttpResponse<User>) => {
          const user: User | null = response.body;

          if (user && user.active) {

            this.internalUser.setInternalUser(user);
            this.router.navigate(['/dashboard']);

          } else {
            localStorage.removeItem('authToken');
          }

        }
      );
    }
  }
}
