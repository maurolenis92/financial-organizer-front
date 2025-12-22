import { inject, Injectable } from '@angular/core';
import { GenericModalData } from '../app/models/generic-moda.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericModalComponent } from '../app/modals/generic-modal/generic-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dialog = inject(MatDialog);

  public openGenericModal(data: GenericModalData): MatDialogRef<GenericModalComponent> {
    return this.dialog.open(GenericModalComponent, {
      width: '500px',
      maxWidth: '80vw',
      disableClose: false,
      panelClass: 'custom-dialog-container',
      data: data,
    });
  }
}
