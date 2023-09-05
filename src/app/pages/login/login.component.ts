import { HttpResponse } from '@angular/common/http';
import { InternalUserService } from '../../shared/internal-values/internal-user/internal-user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { User } from 'src/app/core/interfaces/user.interface';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string;
  password!: string;
  hide: boolean = true;
  remember: boolean = false;

  constructor(
    private alert: AlertService,
    private users: ApiUsersService,
    private authenticator: InternalUserService,
    private router: Router,
    public loadingBar: LoadingService
  ) { }

  login() {
    if (this.email && this.password) {
      this.loadingBar.setLoadingBar(true);
      this.users.getUserLogin(this.email, this.password).subscribe(
        (response: HttpResponse<User | any>) => {

          if (response.status === 200) {

            this.authenticator.setInternalUser(response.body);

            if (this.remember) {
              localStorage.setItem('authToken', response.body.id);
            } else {
              localStorage.removeItem('authToken');
            }

            this.router.navigate(['/dashboard']);
            this.loadingBar.setLoadingBar(false);

          }
        },
        (response) => {
          this.alert.openSnackBar(response.error.message);
          this.loadingBar.setLoadingBar(false);
        });
    } else {
      this.alert.openSnackBar('Preencha todos os campos corretamente!');
    }
  }
}