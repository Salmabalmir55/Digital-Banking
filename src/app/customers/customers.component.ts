import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  filtered: Customer[] = [];
  searchKeyword = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  editingCustomer: Customer | null = null;
  showEditModal = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filtered = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading customers:', err);
        this.loading = false;
        this.errorMsg = 'Failed to load customers.';
      }
    });
  }

  searchCustomers(): void {
    if (this.searchKeyword.trim()) {
      this.customerService.searchCustomers(this.searchKeyword).subscribe({
        next: (data) => {
          this.filtered = data;
        },
        error: (err) => {
          console.error('Search error:', err);
          this.errorMsg = 'Search failed.';
        }
      });
    } else {
      this.filtered = this.customers;
    }
  }

  getAvatarColor(name: string): string {
    const colors = ['#1a6fd4', '#0d9488', '#c05621', '#2d6a4f', '#5c3dc8'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  openEdit(customer: Customer): void {
    this.editingCustomer = { ...customer };
    this.showEditModal = true;
  }

  closeEdit(): void {
    this.showEditModal = false;
    this.editingCustomer = null;
  }

  saveEdit(): void {
    if (!this.editingCustomer) return;
    this.customerService.updateCustomer(this.editingCustomer).subscribe({
      next: () => {
        this.successMsg = 'Customer updated successfully.';
        this.closeEdit();
        this.loadCustomers();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        console.error('Update error:', err);
        this.errorMsg = err.error?.message || 'Update failed.';
      }
    });
  }

  deleteCustomer(id: number): void {
    if (!confirm('Delete this customer?')) return;
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.successMsg = 'Customer deleted.';
        this.loadCustomers();
        setTimeout(() => this.successMsg = '', 3000);
      },
      error: (err) => {
        console.error('Delete error:', err);
        if (err.error?.message?.includes('foreign key')) {
          this.errorMsg = 'Cannot delete customer with existing accounts. Delete their accounts first.';
        } else {
          this.errorMsg = err.error?.message || 'Delete failed.';
        }
      }
    });
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }
}
