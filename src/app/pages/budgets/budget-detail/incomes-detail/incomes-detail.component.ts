import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../../components/input/input.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-incomes-detail',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './incomes-detail.component.html',
  styleUrl: './incomes-detail.component.scss',
})
export class IncomesDetailComponent implements OnInit, OnDestroy {
  @Input() public form!: FormArray;
  public formIncome: FormGroup = new FormGroup({
    concept: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  private $destroy: Subject<void> = new Subject<void>();
  ngOnInit(): void {
    this.form.statusChanges
      .pipe(takeUntil(this.$destroy), distinctUntilChanged())
      .subscribe(() => {
        this.buttonDisabled = this.formIncome.status === 'INVALID';
      });
  }

  public buttonDisabled = true;

  public getControls(): AbstractControl[] {
    return this.form.controls;
  }

  public getGroup(index: number): FormGroup {
    return this.form.at(index) as FormGroup;
  }

  public addIncome(): void {
    this.form.push(
      new FormGroup({
        concept: new FormControl(this.formIncome.get('concept')?.value),
        amount: new FormControl(this.formIncome.get('amount')?.value),
        id: new FormControl(`temp-${Date.now()}`),
      })
    );
    this.formIncome.reset();
  }

  public removeIncome(index: number): void {
    this.form.removeAt(index);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
