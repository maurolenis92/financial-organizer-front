import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BudgetService } from '../../../services/budget.service';
import { combineLatest } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { ButtonComponent } from '../../components/button/button.component';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonComponent, RouterLink, RouterLinkActive],
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
  public items = [
    { label: 'Tablero', icon: 'dashboard', route: '', active: true },
    {
      label: 'Presupuestos',
      icon: 'account_balance_wallet',
      route: '/budgets',
      active: false,
    },
    { label: 'Transacciones', icon: 'swap_horiz', route: '/transactions', active: false },
    { label: 'Categorías', icon: 'category', route: '/categories', active: false },
    { label: 'Reportes', icon: 'bar_chart', route: '/reports', active: false },
    { label: 'Configuración', icon: 'settings', route: '/settings', active: false },
  ];

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

  public navigateTo(item: SidebarItem): void {
    this.items.forEach(i => {
      if (i !== item) {
        i.active = false;
      }
    });
    item.active = true;
    this.router.navigate(['dashboard' + item.route]);
    this.closeSidebar();
  }

  public async logout(): Promise<void> {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
    } catch {
      this.router.navigate(['/login']);
    }
  }
}
