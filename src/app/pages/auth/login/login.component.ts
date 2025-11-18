import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
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
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private $destroy: Subject<void> = new Subject<void>();
  public loading: boolean = false;
  public buttonDisabled: boolean = true;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, EmailValidator()]),
      password: new FormControl('', [Validators.required]),
    });
    this.form.statusChanges
      .pipe(distinctUntilChanged(), takeUntil(this.$destroy))
      .subscribe(status => {
        console.log('cambio');
        this.buttonDisabled = status !== 'VALID';
      });
    this.form.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(value => {
      console.log('cambio', value);
    });
  }

  public login(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control?.markAsDirty({ onlySelf: true });
      });
      return;
    }

    this.loading = true;
    this.authService
      .signIn(this.form.value.username, this.form.value.password)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.error('Error during login:', error);
        this.loading = false;
        this.buttonDisabled = false;
      });
  }

  public goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
