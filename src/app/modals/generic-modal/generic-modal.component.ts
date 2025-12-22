/* eslint-disable no-unused-vars */
import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GenericModalData } from '../../models/generic-moda.model';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent {
  private matDialog = inject(MatDialog);
  constructor(@Inject(MAT_DIALOG_DATA) public data: GenericModalData) {}

  public closeModal(cancel: boolean): void {
    this.matDialog.closeAll();
    if (this.data.cancelAction && cancel) {
      this.data.cancelAction();
    }
    if (this.data.confirmAction && !cancel) {
      this.data.confirmAction();
    }
  }
}
