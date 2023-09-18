import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../../core/interfaces/user.interface';
import { AlertService } from '../../alert/alert.service';
import { InternalCashService } from '../internal-cash/internal-cash.service';

@Injectable({
  providedIn: 'root'
})
export class InternalUserService {

  private internalUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private _internalCash: InternalCashService
  ) { }

  isAuthenticated(): boolean {
    let user: User | null = this.internalUser.getValue();

    //-----------------------dev----------------
    user = {
      email: "1",
      phone: 123,
      password: "1",
      fullName: "Dev Mode",
      firstName: "Dev",
      id: "93dd577d-7ae1-4670-8b20-ac4782a330a1",
      active: true
    };

    this.setInternalUser(user);
    //-------------------------------------------

    return !!user;
  }

  setInternalUser(internalUser: User | null) {
    this.internalUser.next(internalUser);
  }

  getInternalUser(): Observable<User | null> {
    return this.internalUser.asObservable();
  }
}
