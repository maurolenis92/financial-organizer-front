import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Income } from '../../../../models/budget.model';
import { ModalService } from '../../../../../services/modal.service';
import { AlertService } from '../../../../../services/alert.service';

@Component({
  selector: 'app-incomes-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incomes-detail.component.html',
  styleUrl: './incomes-detail.component.scss',
})
export class IncomesDetailComponent {
  @Input() public incomes: Income[] = [];
  @Input() public totalIncomes: number = 0;
  @Input() public currency!: string;
  @Output() public deleteIncome: EventEmitter<boolean> = new EventEmitter<boolean>();
  private modalService = inject(ModalService);
  private alertService = inject(AlertService);

  private deleteIncomeEntry(index: number): void {
    this.incomes.splice(index, 1);
    this.deleteIncome.emit(true);
    this.alertService.showSuccess('Ingreso eliminado exitosamente.');
  }

  public confirmDelete(index: number): void {
    this.modalService.openGenericModal({
      title: 'Confirmar eliminación',
      message: '¿Está seguro que desea eliminar este ingreso?',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmAction: () => this.deleteIncomeEntry(index),
    });
  }
}
