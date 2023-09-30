import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })
  currentUser$: Observable<User | undefined>;

  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    this.currentUser$ = this.authenticationService.currentUser$;
  }

  onLoginFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.authenticationService
      .login(
        this.loginForm.value['email']!,
        this.loginForm.value['password']!)
      .subscribe();
  }

  onLogoutClicked() {
    this.authenticationService
      .logout()
      .subscribe();
  }

  onRefreshClicked() {
    this.authenticationService
      .refresh()
      .subscribe();
  }
}
