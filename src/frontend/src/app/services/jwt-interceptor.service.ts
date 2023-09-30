import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStoreService } from './token-store.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  constructor(
    private readonly tokenStoreService: TokenStoreService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStoreService.getAccessToken();

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken.token}`
        }
      });
    }

    return next.handle(request);
  }
}
