/* eslint-disable no-unused-vars */

import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SelectInputComponent } from '../../components/select-input/select-input.component';
import { STATUS_OPTIONS } from '../../utils/constants/status-option.constant';
import { SelectOption } from '../../models/select.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-item-budget-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    InputComponent,
    ButtonComponent,
    SelectInputComponent,
  ],
  templateUrl: './create-item-budget-modal.component.html',
  styleUrl: './create-item-budget-modal.component.scss',
})
export class CreateItemBudgetModalComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateItemBudgetModalComponent>);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  public statusOptions = STATUS_OPTIONS;
  public categoryOptions: SelectOption[] = this.userService
    .userCategories()
    .map(category => ({
      label: category.name,
      value: category.id,
    }));
  public form: FormGroup = new FormGroup({});

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      concept: ['', Validators.required],
      ...(!this.data.isIncome && {
        status: [this.statusOptions[0], Validators.required],
        categoryId: [
          this.categoryOptions.length > 0 ? this.categoryOptions[0] : '',
          Validators.required,
        ],
        category: [''],
      }),
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      if (!this.data.isIncome) {
        const selectedCategory = this.userService
          .userCategories()
          .find(cat => cat.id === this.form.value.categoryId.value);
        this.form.get('category')?.setValue(selectedCategory);
      }
      this.dialogRef.close(this.form.value);
    }
  }
  public onCancel(): void {
    this.dialogRef.close();
  }
}
