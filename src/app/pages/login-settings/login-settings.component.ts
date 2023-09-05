import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { ConfirmWindowDeleteComponent } from './confirm-window-delete/confirm-window-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/authenticator/user';
import { AlertService } from 'src/app/core/alert/alert.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-settings',
  templateUrl: './login-settings.component.html',
  styleUrls: ['./login-settings.component.css']
})
export class LoginSettingsComponent {

  seePasswordFields: boolean = false;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmNewPassword: boolean = true;
  idInternalUser: string = "";
  firstName!: string;
  surname!: string;
  email!: string;
  phone!: number;
  password!: string;
  newPassword!: string;
  oldPassword!: string;
  confirmNewPassword!: string;

  constructor(
    private internalUser: AuthenticatorService,
    public dialog: MatDialog,
    private alert: AlertService,
    private users: ApiUsersService
  ) { }

  ngOnInit() {
    this.internalUser.getInternalUser().subscribe(user => {
      if (user) {
        this.idInternalUser = user.id;
        this.firstName = user.firstName;

        const words = user.fullName.split(" ");
        words.shift();
        this.surname = words.join(" ");

        this.email = user.email;
        this.phone = user.phone;
        this.password = user.password;
      }
    });
  }

  openModal() {
    this.dialog.open(ConfirmWindowDeleteComponent, {
      width: '500px',
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }

  editAccount() {
    if (this.firstName && this.surname && this.email) {
      if (this.seePasswordFields) {
        if (this.oldPassword && this.newPassword && this.confirmNewPassword) {
          if (this.oldPassword === this.password) {
            if (this.newPassword === this.confirmNewPassword) {
              let modifiedUser: User = {
                "email": this.email,
                "phone": this.phone,
                "password": this.newPassword,
                "fullName": `${this.firstName} ${this.surname}`,
                "firstName": this.firstName,
                "id": this.idInternalUser,
                "active": true
              };
              return this.postModifiedUser(modifiedUser);
            } else {
              return this.alert.openSnackBar('Senhas novas não conferem!');
            }
          } else {
            return this.alert.openSnackBar('Senha antiga incorreta!');
          }
        } else {
          console.log(this.oldPassword)
          console.log(this.newPassword)
          console.log(this.confirmNewPassword)
          return this.alert.openSnackBar('Preencha todos os campos corretamente!');
        }
      } else {
        let modifiedUser: User = {
          "email": this.email,
          "phone": this.phone,
          "password": this.password,
          "fullName": `${this.firstName} ${this.surname}`,
          "firstName": this.firstName,
          "id": this.idInternalUser,
          "active": true
        };
        return this.postModifiedUser(modifiedUser);
      }
    } else {
      return this.alert.openSnackBar('Preencha todos os campos corretamente!');
    }
  }

  private postModifiedUser(modifiedUser: User) {
    this.users.patchUser(modifiedUser.id, modifiedUser).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.internalUser.setInternalUser(modifiedUser);
          this.alert.openSnackBar(response.body.message);
        }
      },
      (response) => {
        this.alert.openSnackBar(response.error);
      }
    );
  }
}

