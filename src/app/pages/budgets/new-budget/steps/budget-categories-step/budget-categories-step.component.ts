import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { scrollToTop } from '../../../../../utils/functions.util';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryModalComponent } from '../../../../../modals/create-category-modal/create-category-modal.component';

@Component({
  selector: 'app-budget-categories-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    MatIconModule,
  ],
  templateUrl: './budget-categories-step.component.html',
  styleUrl: './budget-categories-step.component.scss',
})
export class BudgetCategoriesStepComponent implements OnInit {
  @Input() public formArray!: FormArray;
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    scrollToTop();
  }

  public addCategory(): void {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent, {
      width: '500px',
      maxWidth: '80vw',
      disableClose: false,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generar un ID temporal para la nueva categoría
        const newCategoryId = `temp-${Date.now()}`;

        // Agregar la nueva categoría a la lista (antes del "+ Nueva Categoría")

        this.formArray.push(
          new FormGroup({
            id: new FormControl(newCategoryId),
            name: new FormControl(result.name),
            icon: new FormControl(result.icon),
            color: new FormControl(result.color),
          })
        );
      }
    });
  }

  public getControls(): AbstractControl[] {
    return this.formArray.controls;
  }

  public getGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  public removeCategory(index: number): void {
    this.formArray.removeAt(index);
  }
}
