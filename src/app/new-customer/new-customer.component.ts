import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  customer = {
    name: '',
    email: ''
  };
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public authService: AuthService  // ← AJOUTÉ (public pour le template)
  ) {}

  submit(): void {
    if (!this.customer.name || !this.customer.email) {
      this.errorMsg = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.customerService.saveCustomer(this.customer).subscribe({
      next: (savedCustomer) => {
        this.loading = false;
        this.successMsg = `Customer ${savedCustomer.name} created successfully!`;
        setTimeout(() => {
          this.reset();
          this.router.navigate(['/admin/customers']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Failed to create customer';
        console.error(err);
      }
    });
  }

  reset(): void {
    this.customer = { name: '', email: '' };
    this.errorMsg = '';
    this.successMsg = '';
  }
}
