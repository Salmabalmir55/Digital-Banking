import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  loading = false;
  showPass = false;
  userFocused = false;
  passFocused = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMsg = 'Please fill in both fields.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401 || err.status === 403) {
          this.errorMsg = 'Invalid username or password.';
        } else {
          this.errorMsg = 'Server error. Please try again later.';
        }
      }
    });
  }
}
