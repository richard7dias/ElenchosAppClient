import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { AlertService } from 'src/app/core/alert/alert.service';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { User } from 'src/app/core/authenticator/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-window-delete',
  templateUrl: './confirm-window-delete.component.html',
  styleUrls: ['./confirm-window-delete.component.css']
})
export class ConfirmWindowDeleteComponent {

  internalUser!: User;
  hidePassword: boolean = true;
  seePasswordField: boolean = false;
  password!: string;

  constructor(
    public dialog: MatDialog,
    private users: ApiUsersService,
    private user: AuthenticatorService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.user.getInternalUser().subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    });
  }

  protected deleteUser() {
    if (this.password === this.internalUser.password) {
      this.users.deleteUser(this.internalUser.id).subscribe(
        (response: HttpResponse<any>) => {
          this.alert.openSnackBar(response.body.message);
        }
      );
      this.user.setInternalUser(null);
      this.router.navigate(['/login']);
    } else {
      this.alert.openSnackBar('Senha incorreta.');
    }
  }
}