import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Update path based on your project structure
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (
      this.registerForm.valid &&
      this.registerForm.get('password')?.value ===
        this.registerForm.get('confirmPassword')?.value
    ) {
      const { email, password } = this.registerForm.value;

      if (this.authService.register({ email, password, name: 'User' })) {
        this.successMessage = 'Registration successful. You can now log in.';
        this.errorMessage = null;
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Email already registered.';
        this.successMessage = null;
      }
    } else {
      this.errorMessage = 'Form is invalid or passwords do not match.';
    }
  }
}
