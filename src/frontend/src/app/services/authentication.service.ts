import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { UserId } from '../models/user-id';
import { UserRole } from '../models/user-role';
import * as dayjs from 'dayjs';
import { TokenStoreService } from './token-store.service';
import { Token } from '../models/token';

interface LoginResponseDto {
  user: UserDto,
  tokens: TokensDto
}

interface UserDto {
  role: string,
  isEmailVerified: boolean,
  name: string,
  email: string,
  id: string
}

interface TokensDto {
  access: TokenDto,
  refresh: TokenDto
}

interface TokenDto {
  token: string,
  expires: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly tokenStoreService: TokenStoreService
    ) {
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<LoginResponseDto>('http://localhost:3000/v1/auth/login', {
        email,
        password
      })
      .pipe(
        tap(response => {
          this.tokenStoreService.saveTokens(
            new Token(
              response.tokens.access.token,
              dayjs(response.tokens.access.expires)),
            new Token(
                response.tokens.refresh.token,
                dayjs(response.tokens.refresh.expires)));
        }),
        map(response => new User(
          new UserId(response.user.id),
          response.user.name,
          response.user.email,
          new UserRole(response.user.role))),
        tap(user => this.currentUser$.next(user)));
  }

  logout(): Observable<Object> {
    const refreshToken = this.tokenStoreService.getRefreshToken();

    if (!refreshToken) {
      return of({});
    }

    return this.httpClient
      .post('http://localhost:3000/v1/auth/logout', {
        refreshToken: refreshToken.token
      })
      .pipe(
        tap(() => {
          this.currentUser$.next(undefined)
          this.tokenStoreService.removeTokens();
        }));
  }

  refresh(): Observable<Object> {
    const refreshToken = this.tokenStoreService.getRefreshToken();

    if (!refreshToken) {
      return of({});
    }

    return this.httpClient
      .post<TokensDto>('http://localhost:3000/v1/auth/refresh-tokens', {
        refreshToken: refreshToken.token
      })
      .pipe(
        tap(response => {
          this.tokenStoreService.saveTokens(
            new Token(
              response.access.token,
              dayjs(response.access.expires)),
            new Token(
              response.refresh.token,
              dayjs(response.refresh.expires)));
        }));
  }
}
