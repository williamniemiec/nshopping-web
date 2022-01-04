import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/StorageService';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storageService: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localUser = this.storageService.getLocalUser();

    if (localUser && this.isRequestToApi(req)) {
      const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
     
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }

  isRequestToApi(request: HttpRequest<any>) {
    const baseUrlLength = API_CONFIG.baseUrl.length;

    return (request.url.substring(0, baseUrlLength) == API_CONFIG.baseUrl);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
