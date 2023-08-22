import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { MainComponentsModule } from './main-components/main-components.module';
import { LoadingService } from './core/login/loading.service';
import { AuthGuard } from './core/auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    MainComponentsModule,
    MatProgressBarModule
  ],
  providers: [
    LoadingService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
