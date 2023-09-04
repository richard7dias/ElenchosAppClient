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
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css']
})
export class ConfirmWindowComponent {
  internalUser!: Observable<User | null>;

  constructor(
    public dialog: MatDialog,
    private users: ApiUsersService,
    private user: AuthenticatorService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.internalUser = this.user.getInternalUser();
  }

  protected okButtom() {
    this.internalUser.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.users.deleteUser(user.id).subscribe(
          (response: HttpResponse<any>) => {
              this.alert.openSnackBar(response.body.message, 'Fechar', 10);
          }
        );
        this.user.setInternalUser(null);
        this.router.navigate(['/login']);
      }
    });
  }
}
