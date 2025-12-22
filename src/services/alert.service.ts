/* eslint-disable no-unused-vars */
import { inject, Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScreenSizeService } from './screen-size.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService implements OnDestroy {
  private snackBar = inject(MatSnackBar);
  private screenSizeService = inject(ScreenSizeService);
  private destroy$: Subject<void> = new Subject<void>();
  private isMobile: boolean = false;
  constructor() {
    this.screenSizeService.screenSize$.pipe(takeUntil(this.destroy$)).subscribe(size => {
      this.isMobile = size.isMobile || size.isTablet;
    });
  }

  public showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 1000,
      horizontalPosition: this.isMobile ? 'center' : 'right',
      verticalPosition: this.isMobile ? 'bottom' : 'top',
      panelClass: ['snackbar-success'],
    });
  }

  public showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 1000,
      horizontalPosition: this.isMobile ? 'center' : 'right',
      verticalPosition: this.isMobile ? 'bottom' : 'top',
      panelClass: ['snackbar-error'],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
