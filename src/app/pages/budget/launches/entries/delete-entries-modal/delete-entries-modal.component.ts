import { HttpResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiLaunchesService } from 'src/app/core/api/launches/api-launches.service';
import { Launch } from 'src/app/core/interfaces/launches/launch.interface';

import { AlertService } from 'src/app/shared/alert/alert.service';
import { InternalLaunchesService } from 'src/app/shared/internal-values/internal-launches/internal-launches.service';
import { LoadingService } from 'src/app/shared/loading/loading.service';

@Component({
  selector: 'app-delete-entries-modal',
  templateUrl: './delete-entries-modal.component.html',
  styleUrls: ['./delete-entries-modal.component.css']
})
export class DeleteEntriesModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data: any,
    private _alert: AlertService,
    private _modalRef: MatDialogRef<DeleteEntriesModalComponent>,
    private _loadingBar: LoadingService,
    private _apiLaunches: ApiLaunchesService,
    private _internalLaunches: InternalLaunchesService
  ) { }

  deleteLaunch() {
    this._loadingBar.setLoadingBar(true);
    this._apiLaunches.deleteLaunch(this._data.id).subscribe(
      (response: HttpResponse<any>) => {
        this._alert.openSnackBar(response.body.message);
        this.updateLaunches();
      },
      (response) => {
        this._alert.openSnackBar(response.error.message);
      }
    );
    this._loadingBar.setLoadingBar(false);
    this._modalRef.close(true);
  }

  updateLaunches() {
    this._apiLaunches.getLaunches().subscribe(
      (response: HttpResponse<Launch[]>) => {
        if (response.body) {
          this._internalLaunches.setInternalLaunches(response.body);
        }
      }
    );
  }
}