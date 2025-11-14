import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error = '';

  returnUrl: string = '/products';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get returnUrl from route parameters or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
  }

  onSubmit(): void {
    this.error = '';
    this.authService.login(this.username, this.password)
      .subscribe({
        next: success => {
          if (success) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.error = 'Login failed: Invalid credentials';
          }
        },
        error: err => {
          console.error('Login error:', err);
          this.error = 'Login failed: Server error';
        }
      });
  }

}

