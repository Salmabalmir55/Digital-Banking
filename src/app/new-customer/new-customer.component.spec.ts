import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCustomerComponent } from './new-customer.component';
import { CustomerService } from '../services/customer.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('NewCustomerComponent', () => {
  let component: NewCustomerComponent;
  let fixture: ComponentFixture<NewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCustomerComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [CustomerService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
