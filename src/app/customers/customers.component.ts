import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Customer[]>;
  loading = false;
  searchKeyword = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customers = this.customerService.getCustomers();
    this.customers.subscribe(() => this.loading = false);
  }

  searchCustomers(): void {
    if (this.searchKeyword.trim()) {
      this.customers = this.customerService.searchCustomers(this.searchKeyword);
    } else {
      this.customers = this.customerService.getCustomers();
    }
  }

  getAvatarColor(name: string): string {
    const colors = ['#1a6fd4', '#0d9488', '#c05621', '#2d6a4f', '#5c3dc8'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  editCustomer(customer: Customer): void {
    console.log('Edit customer:', customer);
  }

  deleteCustomer(customer: Customer): void {
    if (confirm('Are you sure?')) {
      this.customerService.deleteCustomer(customer.id!).subscribe(() => {
        this.loadCustomers();
      });
    }
  }
}
