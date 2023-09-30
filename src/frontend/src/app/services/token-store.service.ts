import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import * as dayjs from 'dayjs';

interface TokenDto {
  token: string,
  expires: string
}

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  private readonly AccessTokenKey = 'frontend-accessToken';
  private readonly RefreshTokenKey = 'frontend-refreshToken';

  constructor() { }

  saveTokens(accessToken: Token, refreshToken: Token) {
    localStorage.setItem(
      this.AccessTokenKey,
      JSON.stringify({
        token: accessToken.token,
        expires: accessToken.expires.toISOString()
      }));
    localStorage.setItem(
      this.RefreshTokenKey,
      JSON.stringify({
        token: refreshToken.token,
        expires: refreshToken.expires.toISOString()
      }));
  }

  removeTokens() {
    localStorage.removeItem(this.AccessTokenKey);
    localStorage.removeItem(this.RefreshTokenKey);
  }

  getAccessToken(): Token | undefined {
    const tokenString = localStorage.getItem(this.AccessTokenKey);

    if (!tokenString) {
      return undefined;
    }

    const tokenDto = JSON.parse(tokenString) as TokenDto;

    return new Token(tokenDto.token, dayjs(tokenDto.expires));
  }

  getRefreshToken(): Token | undefined {
    const tokenString = localStorage.getItem(this.RefreshTokenKey);

    if (!tokenString) {
      return undefined;
    }

    const tokenDto = JSON.parse(tokenString) as TokenDto;

    return new Token(tokenDto.token, dayjs(tokenDto.expires));
  }
}
