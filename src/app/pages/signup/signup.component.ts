import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { SessionCacheService } from 'src/app/shared/session/session-cache.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  firstName!: string;
  surname!: string;
  email!: string;
  phone!: number;
  password!: string;
  confirmPassword!: string;

  constructor(
    private alert: AlertService,
    private users: ApiUsersService,
    private router: Router,
    private authenticator: InternalUserService,
    private loadingBar: LoadingService,
    private sessionCache: SessionCacheService
  ) { }

  addNewUser() {
    if (this.firstName && this.surname && this.email && this.password && this.confirmPassword) {

      if (this.password !== this.confirmPassword) {
        return this.alert.openSnackBar("Erro! As senhas não conferem.");
      }

      let newUser: User = {
        id: '', // É gerado na API
        email: this.email,
        phone: this.phone,
        password: this.password,
        fullName: `${this.firstName} ${this.surname}`,
        firstName: this.firstName,
        active: true
      }

      this.loadingBar.setLoadingBar(true);
      this.users.postUser(newUser).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.sessionCache.clearUserData();
            this.authenticator.setInternalUser(newUser);
            this.router.navigate(['/dashboard']);
            this.alert.openSnackBar(response.body.message);
            this.loadingBar.setLoadingBar(false);
          }
        },
        (response) => {
          this.alert.openSnackBar(response.error);
          this.loadingBar.setLoadingBar(false);
        }
      );
    } else {
      this.alert.openSnackBar('Erro! Preencha todos os dados necessários.');
    }
  }
}
