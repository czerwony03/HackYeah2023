import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
  }

  onLoginFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authenticationService
      .login(
        this.loginForm.value['email']!,
        this.loginForm.value['password']!)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
