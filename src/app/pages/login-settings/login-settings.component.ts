import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { AuthenticatorService } from 'src/app/core/authenticator/authenticator.service';
import { ConfirmWindowComponent } from './confirm-window/confirm-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-settings',
  templateUrl: './login-settings.component.html',
  styleUrls: ['./login-settings.component.css']
})
export class LoginSettingsComponent {

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  idInternalUser: string = "";
  firstName?: string;
  surname?: string;
  email?: string;
  phone?: number;
  password?: string;
  confirmPassword!: string;

  constructor(
    private internalUser: AuthenticatorService,
    private users: ApiUsersService,
    private router: Router,
    public dialog: MatDialog
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
    this.dialog.open(ConfirmWindowComponent, {
      width: '250px',
      enterAnimationDuration: "200ms",
      exitAnimationDuration: "200ms",
    });
  }
}

