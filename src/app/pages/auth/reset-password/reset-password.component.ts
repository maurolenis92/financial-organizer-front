import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { EmailValidator } from '../../../utils/custom-validators';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent, InputComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public resetForm!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private $destroy: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  public buttonDisabled: boolean = true;
  public errorMessage: string = '';
  public successMessage: string = '';
  public showResetForm: boolean = false;
  public userEmail: string = '';

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, EmailValidator()]),
    });

    this.resetForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    this.form.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe(() => {
        this.buttonDisabled = this.form.invalid;
        this.errorMessage = '';
        this.successMessage = '';
      });

    this.resetForm.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe(() => {
        this.buttonDisabled = this.resetForm.invalid || !this.passwordsMatch();
        this.errorMessage = '';
        this.successMessage = '';
      });
  }

  public passwordsMatch(): boolean {
    const password = this.resetForm.get('newPassword')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  public resetPassword(): void {
    if (this.form.invalid) {
      this.form.get('email')?.markAsDirty({ onlySelf: true });
      return;
    }

    this.buttonDisabled = true;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const email = this.form.value.email;
    this.userEmail = email;

    this.authService
      .resetPassword(email)
      .then(() => {
        this.loading = false;
        this.showResetForm = true;
        this.buttonDisabled = true;
        this.successMessage =
          '¡Correo enviado! Ingresa el código que recibiste y tu nueva contraseña.';
      })
      .catch(error => {
        this.loading = false;
        this.buttonDisabled = false;
        if (error.code === 'UserNotFoundException') {
          this.errorMessage = 'No existe una cuenta con este correo electrónico.';
        } else {
          this.errorMessage = 'Error al enviar el correo. Intenta nuevamente.';
        }
      });
  }

  public confirmReset(): void {
    if (this.resetForm.invalid || !this.passwordsMatch()) {
      Object.keys(this.resetForm.controls).forEach(field => {
        const control = this.resetForm.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
      if (!this.passwordsMatch()) {
        this.errorMessage = 'Las contraseñas no coinciden.';
      }
      return;
    }

    this.buttonDisabled = true;
    this.loading = true;
    this.errorMessage = '';

    this.authService
      .confirmResetPassword(
        this.userEmail,
        this.resetForm.value.code,
        this.resetForm.value.newPassword
      )
      .then(() => {
        this.loading = false;
        this.successMessage = '¡Contraseña restablecida exitosamente! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      })
      .catch(error => {
        this.loading = false;
        this.buttonDisabled = false;
        if (error.code === 'CodeMismatchException') {
          this.errorMessage = 'Código incorrecto. Verifica e intenta de nuevo.';
        } else if (error.code === 'ExpiredCodeException') {
          this.errorMessage = 'El código ha expirado. Solicita uno nuevo.';
        } else {
          this.errorMessage = 'Error al restablecer la contraseña. Intenta de nuevo.';
        }
      });
  }

  public resendCode(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService
      .resetPassword(this.userEmail)
      .then(() => {
        this.loading = false;
        this.successMessage = 'Código reenviado. Revisa tu correo.';
      })
      .catch(() => {
        this.loading = false;
        this.errorMessage = 'Error al reenviar el código.';
      });
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
