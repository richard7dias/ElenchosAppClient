import { Component } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elenchos';
  loadingBarVisible: boolean = false;

  constructor(public loadingService: LoadingService) { }
}
