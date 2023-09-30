import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser$: Observable<User | undefined>;

  constructor(
    private readonly authenticationService: AuthenticationService
  ) {
    this.currentUser$ = this.authenticationService.currentUser$;
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
