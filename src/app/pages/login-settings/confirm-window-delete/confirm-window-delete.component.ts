import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlertService } from 'src/app/shared/alert/alert.service';
import { ApiUsersService } from 'src/app/core/api/users/api-users.service';
import { InternalUserService } from 'src/app/shared/internal-values/internal-user/internal-user.service';
import { User } from 'src/app/core/interfaces/users/user.interface';
import { HttpResponse } from '@angular/common/http';
import { LoadingService } from 'src/app/shared/loading/loading.service';
import { SessionCacheService } from 'src/app/shared/session/session-cache.service';

@Component({
  selector: 'app-confirm-window-delete',
  templateUrl: './confirm-window-delete.component.html',
  styleUrls: ['./confirm-window-delete.component.css']
})
export class ConfirmWindowDeleteComponent implements OnDestroy {

  private _destroy$ = new Subject<void>();

  internalUser!: User;
  hidePassword: boolean = true;
  seePasswordField: boolean = false;
  password!: string;

  constructor(
    public dialog: MatDialog,
    private users: ApiUsersService,
    private user: InternalUserService,
    private router: Router,
    private alert: AlertService,
    private loadingBar: LoadingService,
    private modalRef: MatDialogRef<ConfirmWindowDeleteComponent>,
    private sessionCache: SessionCacheService
  ) { }

  ngOnInit() {
    this.user.getInternalUser().pipe(takeUntil(this._destroy$)).subscribe(user => {
      if (user) {
        this.internalUser = user;
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected deleteUser() {
    if (this.password === this.internalUser.password) {
      this.loadingBar.setLoadingBar(true);
      this.users.deleteUser(this.internalUser.id).subscribe(
        (response: HttpResponse<any>) => {
          this.alert.openSnackBar(response.body.message);
          this.modalRef.close(true);
          this.loadingBar.setLoadingBar(false);
        }
      );
      this.user.setInternalUser(null);
      this.sessionCache.clearUserData();
      this.router.navigate(['/login']);
    } else {
      this.alert.openSnackBar('Senha incorreta.');
    }
  }
}