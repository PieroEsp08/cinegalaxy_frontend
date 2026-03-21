import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  logout(): void {
    this.authService.logout();
    this.toastService.info('Sesión cerrada', 'Hasta pronto.');
    this.router.navigate(['/inicio']);
  }
}