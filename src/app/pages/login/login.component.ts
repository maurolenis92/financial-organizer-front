import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  public form!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public login(): void {
    // Navegar al home cuando se presiona el botón
    this.router.navigate(['/home']);
  }
}
