import { HttpResponse } from '@angular/common/http';
import { AuthenticatorService } from './../../core/authenticator/authenticator.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { User } from 'src/app/core/authenticator/user';

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
    private authenticator: AuthenticatorService,
    private router: Router
  ) { }

  login() {
    if (this.email && this.password) {
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

          }
        },
        (response) => {
          this.alert.openSnackBar(response.error.message, 'Fechar', 6);
        });
    } else {
      this.alert.openSnackBar('Preencha todos os campos corretamente!', 'Fechar', 6);
    }
  }
}