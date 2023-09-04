import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { User } from 'src/app/core/authenticator/user';

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
    private authenticator: AuthenticatorService,
  ) { }

  addNewUser() {
    if (this.firstName && this.surname && this.email && this.password && this.confirmPassword) {

      if (this.password !== this.confirmPassword) {
        return this.alert.openSnackBar("Erro! As senhas não conferem.", "Fechar", 7);
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

      this.users.postUser(newUser).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.authenticator.setInternalUser(newUser);
            this.router.navigate(['/dashboard']);
            this.alert.openSnackBar(response.body.message, 'Fechar', 7);

            console.log(response);
          }
        },
        (response) => {
          this.alert.openSnackBar(response.error, 'Fechar', 7);
          console.log(response);
        }
      );
    } else {
      this.alert.openSnackBar('Erro! Preencha todos os dados necessários.', 'Fechar', 7);
    }
  }
}
