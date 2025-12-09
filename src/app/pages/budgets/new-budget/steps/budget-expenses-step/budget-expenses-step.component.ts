import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../../components/input/input.component';
import { SelectInputComponent } from '../../../../../components/select-input/select-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SelectOption } from '../../../../../models/select.model';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { STATUS_OPTIONS } from '../../../../../utils/constants/status-option.constant';
import { CreateCategoryModalComponent } from '../../../../../modals/create-category-modal/create-category-modal.component';
import { scrollToTop } from '../../../../../utils/functions.util';
import { Category } from '../../../../../models/user.model';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-budget-expenses-step',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    InputComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './budget-expenses-step.component.html',
  styleUrl: './budget-expenses-step.component.scss',
})
export class BudgetExpensesStepComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public formArray!: FormArray;
  @Input() public selectedCurrency: string = 'COP';
  @Input() public categoriesInput: Category[] = [];
  public formExpense: FormGroup = new FormGroup({
    amount: new FormControl('', Validators.required),
    concept: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    newCategory: new FormControl(''),
    status: new FormControl('', Validators.required),
  });
  private $destroy: Subject<void> = new Subject<void>();
  private dialog = inject(MatDialog);
  public buttonDisabled: boolean = true;

  private readonly NEW_CATEGORY_VALUE = 'new-category';

  public categories: SelectOption[] = [];
  public statuses: SelectOption[] = STATUS_OPTIONS;

  ngOnInit(): void {
    scrollToTop();
    // Observar cambios en el campo de categoría
    this.formExpense.valueChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(() => {
        this.buttonDisabled = this.formExpense.invalid;
      });
    this.formExpense
      .get('category')
      ?.valueChanges.pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(value => {
        this.onCategoryChange(value?.value);
      });
  }

  ngOnChanges(): void {
    this.categories = [
      ...this.categoriesInput.map(cat => ({ label: cat.name, value: cat.id })),
      { label: '+ Nueva Categoría', value: this.NEW_CATEGORY_VALUE },
    ];
  }

  public onCategoryChange(value: string): void {
    if (value === this.NEW_CATEGORY_VALUE) {
      this.openCreateCategoryModal();
    }
  }

  private openCreateCategoryModal(): void {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent, {
      width: '500px',
      maxWidth: '90vw',
      disableClose: false,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Generar un ID temporal para la nueva categoría
        const newCategoryId = `temp-${Date.now()}`;

        // Agregar la nueva categoría a la lista (antes del "+ Nueva Categoría")
        const newCategory: SelectOption = {
          label: result.name,
          value: newCategoryId,
        };

        this.categoriesInput.push({
          id: newCategoryId,
          name: result.name,
          color: result.color,
          icon: result.icon,
        });
        this.categories.push(newCategory);

        // Auto-seleccionar la nueva categoría
        this.formExpense.get('category')?.setValue(newCategory);
      } else {
        this.formExpense.get('category')?.setValue('');
      }
    });
  }

  public addExpense(): void {
    this.formArray.push(
      new FormGroup({
        amount: new FormControl(this.formExpense.get('amount')?.value),
        concept: new FormControl(this.formExpense.get('concept')?.value),
        category: new FormControl(this.formExpense.get('category')?.value),
        status: new FormControl(this.formExpense.get('status')?.value),
      })
    );
    this.formExpense.reset();
  }

  public removeExpense(index: number): void {
    this.formArray.removeAt(index);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
