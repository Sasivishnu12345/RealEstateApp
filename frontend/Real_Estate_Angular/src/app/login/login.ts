import { Component } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports:[FormsModule, RouterModule],
  styleUrls:['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res) => {

      if (res && res.token) {

        // ✅ SUCCESS ALERT
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.auth.saveToken(res.token);
          this.router.navigate(['/home']);
        });

      } else {

        // ❌ WRONG PASSWORD / INVALID CREDENTIALS
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: res.message || 'Invalid Email or Password'
        });

        this.errorMessage = res.message;
      }
    },

    error: () => {

      // ❌ SERVER ERROR
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong. Please try again.'
      });

      this.errorMessage = "Server Error";
    }
    });
  }
}