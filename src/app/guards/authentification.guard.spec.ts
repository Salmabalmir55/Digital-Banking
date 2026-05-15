import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthentificationGuard } from './authentification.guard';
import { AuthService } from '../services/auth.service';

describe('AuthentificationGuard', () => {
  let guard: AuthentificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, AuthentificationGuard]
    });
    guard = TestBed.inject(AuthentificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
