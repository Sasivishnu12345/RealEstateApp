import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
 username = '';
  email = '';
  password = '';
  role = 'User';

  message = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

   this.auth.register(user).subscribe({
  next: (res) => {

    if (res && res.message) {

      // ✅ SUCCESS ALERT
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Redirecting to login...',
        timer: 1500,
        showConfirmButton: false
      });

      this.message = "Registration Successful!";

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

    } else {

      // ❌ ELSE PART (Unexpected response)
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: res.message || 'Something went wrong. Please try again.'
      });

      this.errorMessage = "Registration failed";
    }
  },

  error: (err) => {

    // ❌ ERROR BLOCK
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: err.error?.message || "Registration failed"
    });

    this.errorMessage = err.error?.message || "Registration failed";
  }
  });
  }
}
