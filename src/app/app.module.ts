import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { MainComponentsModule } from './main-components/main-components.module';
import { AuthGuard } from './core/auth-guard/auth-guard.service';
import { AlertService } from './shared/alert/alert.service';
import { NumberService } from './shared/formatting/number/number.service';
import { InternalUserService } from './shared/internal-values/internal-user/internal-user.service';
import { DateService } from './shared/formatting/date/date.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    MainComponentsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    InternalUserService,
    AlertService,
    NumberService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
