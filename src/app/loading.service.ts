import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loadingBar: boolean = false;

  setLoadingBar(): void {
    this.loadingBar = !this.loadingBar;
  }

  getLoadingBar(): boolean {
    return this.loadingBar;
  }
}