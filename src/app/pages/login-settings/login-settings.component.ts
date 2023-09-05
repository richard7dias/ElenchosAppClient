import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { ConfirmWindowDeleteComponent } from './confirm-window-delete/confirm-window-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/user.interface';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { HttpResponse } from '@angular/common/http';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-login-settings',
  templateUrl: './login-settings.component.html',
  styleUrls: ['./login-settings.component.css']
})
export class LoginSettingsComponent {

  internalUser!: User;

  seePasswordFields: boolean = false;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmNewPassword: boolean = true;

  firstName!: string;
  surname!: string;
  email!: string;
  phone!: number;
  oldPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;

  constructor(
    private user: InternalUserService,
    public dialog: MatDialog,
    private alert: AlertService,
    private users: ApiUsersService,
    private loadingBar: LoadingService
  ) { }

  ngOnInit() {
    this.user.getInternalUser().subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    });

    const words = this.internalUser.fullName.split(" ");
    words.shift();
    this.surname = words.join(" ");
    this.firstName = this.internalUser.firstName;
    this.email = this.internalUser.email;
    this.phone = this.internalUser.phone;
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
          if (this.oldPassword === this.internalUser.password) {
            if (this.newPassword === this.confirmNewPassword) {
              let modifiedUser: User = {
                "email": this.email,
                "phone": this.phone,
                "password": this.newPassword,
                "fullName": `${this.firstName} ${this.surname}`,
                "firstName": this.firstName,
                "id": this.internalUser.id,
                "active": this.internalUser.active
              };
              return this.postModifiedUser(modifiedUser);
            } else {
              return this.alert.openSnackBar('Senhas novas não conferem!');
            }
          } else {
            return this.alert.openSnackBar('Senha antiga incorreta!');
          }
        } else {
          return this.alert.openSnackBar('Preencha todos os campos corretamente!');
        }
      } else {
        let modifiedUser: User = {
          "email": this.email,
          "phone": this.phone,
          "password": this.internalUser.password,
          "fullName": `${this.firstName} ${this.surname}`,
          "firstName": this.firstName,
          "id": this.internalUser.id,
          "active": this.internalUser.active
        };
        return this.postModifiedUser(modifiedUser);
      }
    } else {
      return this.alert.openSnackBar('Preencha todos os campos corretamente!');
    }
  }

  private postModifiedUser(modifiedUser: User) {
    this.loadingBar.setLoadingBar(true);
    this.users.patchUser(modifiedUser.id, modifiedUser).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.user.setInternalUser(modifiedUser);
          this.alert.openSnackBar(response.body.message);
          this.loadingBar.setLoadingBar(false);
        }
      },
      (response) => {
        this.alert.openSnackBar(response.error);
        this.loadingBar.setLoadingBar(false);
      }
    );
  }
}

