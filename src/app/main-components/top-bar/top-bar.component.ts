import { Component } from '@angular/core';

import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  [x: string]: any;

  constructor(private loadingService: LoadingService) { }

  toggleLoading(): void {
    this.loadingService.setLoadingBar();
  }
}