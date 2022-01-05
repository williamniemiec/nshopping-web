import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../dto/credentials.dto";
import { LocalUserDTO } from "../dto/local-user.dto";
import { CartService } from "./CartService";
import { StorageService } from "./StorageService";

@Injectable(
  { providedIn: 'root' }
)
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    public http: HttpClient, 
    public storageService: StorageService,
    public cartService: CartService
  ) {
  }

  authenticate(credentials: CredentialsDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`, 
      credentials, 
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  successfulLogin(authorizationValue: string) {
    const token = authorizationValue.substring(7);
    const user: LocalUserDTO = {
      token,
      email: this.jwtHelper.decodeToken(token).sub
    };
    this.storageService.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storageService.setLocalUser(null);
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`, 
      {},
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
