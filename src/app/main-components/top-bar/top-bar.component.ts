import { Router } from '@angular/router';
import { InternalUserService } from '../../shared/internal-values/internal-user/internal-user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  userName?: string;

  constructor(
    private internalUser: InternalUserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.internalUser.getInternalUser().subscribe(user => {
      this.userName = user?.firstName;
    });
  }

  logout() {
    this.internalUser.setInternalUser(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('authToken');
  }
}