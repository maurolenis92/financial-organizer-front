import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public username = '';
  public password = '';
  private router = inject(Router);

  public login(): void {
    // Navegar al home cuando se presiona el botón
    this.router.navigate(['/home']);
  }
}
