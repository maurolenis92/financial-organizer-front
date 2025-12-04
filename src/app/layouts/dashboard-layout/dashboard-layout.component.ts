import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BudgetService } from '../../../services/budget.service';
import { combineLatest } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private budgetsService = inject(BudgetService);
  private userService = inject(UserService);
  private router = inject(Router);
  public userData = this.userService.userData;

  public isSidebarOpen: boolean = false;

  ngOnInit(): void {
    // Inicializar datos necesarios al cargar el layout del dashboard
    combineLatest([
      this.budgetsService.getBudgets(),
      this.userService.getUserProfile(),
    ]).subscribe();
  }

  public toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  public async logout(): Promise<void> {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
      // En caso de error, forzar redirect al login
      this.router.navigate(['/login']);
    }
  }
}
