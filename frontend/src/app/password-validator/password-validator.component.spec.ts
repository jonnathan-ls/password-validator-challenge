import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordValidatorComponent } from './password-validator.component';
import { PasswordValidatorService } from '../password-validator.service';

import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('PasswordValidatorComponent', () => {
  let component: PasswordValidatorComponent;
  let fixture: ComponentFixture<PasswordValidatorComponent>;
  // let mockService: jasmine.SpyObj<PasswordValidatorService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordValidatorComponent],
      providers: [
        PasswordValidatorService,
        provideHttpClient(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
