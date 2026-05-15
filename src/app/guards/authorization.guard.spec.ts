import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorizationGuard } from './authorization.guard';
import { AuthService } from '../services/auth.service';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, AuthorizationGuard]
    });
    guard = TestBed.inject(AuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
