import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { EmailValidator } from '../../../utils/custom-validators';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

// Validator function para confirmar contraseñas
const PasswordMatchValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (
      password.value &&
      confirmPassword.value &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    // Limpiar error si las contraseñas coinciden
    if (
      confirmPassword.hasError('passwordMismatch') &&
      password.value === confirmPassword.value
    ) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordMismatch'];
      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private $destroy: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  public buttonDisabled: boolean = true;
  public registrationStep: 'register' | 'confirm' = 'register';
  public userEmail: string = '';

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, EmailValidator()]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [PasswordMatchValidator()],
      }
    );

    this.form.statusChanges
      .pipe(distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe(status => {
        this.buttonDisabled = status !== 'VALID';
      });
  }

  public signUp(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
      return;
    }

    this.loading = true;
    const { email, password, name } = this.form.value;
    this.userEmail = email;

    this.authService
      .signUp(email, password, name)
      .then(result => {
        console.log('Sign up successful:', result);
        this.loading = false;
        this.registrationStep = 'confirm';
        this.setupConfirmationForm();
      })
      .catch(error => {
        console.error('Error during sign up:', error);
        this.loading = false;
        this.buttonDisabled = false;
      });
  }

  private setupConfirmationForm(): void {
    this.form = this.fb.group({
      confirmationCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.form.statusChanges
      .pipe(distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe(status => {
        this.buttonDisabled = status !== 'VALID';
      });
  }

  public confirmSignUp(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
      return;
    }

    this.loading = true;
    const { confirmationCode } = this.form.value;

    this.authService
      .confirmSignUp(this.userEmail, confirmationCode)
      .then(() => {
        console.log('Confirmation successful');
        this.loading = false;
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error during confirmation:', error);
        this.loading = false;
        this.buttonDisabled = false;
      });
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  public backToRegister(): void {
    this.registrationStep = 'register';
    this.ngOnInit(); // Reinicializar formulario
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
