import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/StorageService';
import { API_CONFIG } from '../config/api.config';


/**
 * Responsible for intercepting and authenticate headers.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public storageService: StorageService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let parsedRequest = req;
    
    if (this.isLogged() && this.isRequestToApi(req)) {
      parsedRequest = this.insertAuthorizationInHeader(req);
    }
    
    return next.handle(parsedRequest);
  }

  private isLogged(): boolean {
    const localUser = this.storageService.getLocalUser();

    return  (localUser != null)
            && (localUser != undefined)
  }

  private isRequestToApi(request: HttpRequest<any>): boolean {
    const baseUrlLength = API_CONFIG.baseUrl.length;

    return (request.url.substring(0, baseUrlLength) == API_CONFIG.baseUrl);
  }

  private insertAuthorizationInHeader(req: HttpRequest<any>): HttpRequest<any> {
    const localUser = this.storageService.getLocalUser();

    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)
    });
  }
}


/**
 * Responsible for providing authentication interceptor.
 */
export const AuthInterceptorProvider = {

  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
