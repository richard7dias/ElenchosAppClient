import { Component } from '@angular/core';
import { LoadingService } from './shared/loading/loading.service';
import { ApiUsersService } from './core/api/users/api-users.service';
import { InternalUserService } from './shared/internal-values/internal-user/internal-user.service';
import { Router } from '@angular/router';
import { User } from './core/interfaces/user.interface';
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
    public loadingBar: LoadingService,
    private internalUser: InternalUserService,
    private users: ApiUsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuthLocalStorage();
    this.seeLoadingBar();
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

  private seeLoadingBar() {
    this.loadingBar.getLoadingBar().subscribe(bar => {
      this.loadingBarVisible = bar;
    });
  }
}
