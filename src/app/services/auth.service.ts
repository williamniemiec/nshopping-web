import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../dto/credentials.dto";
import { LocalUserDTO } from "../dto/local-user.dto";
import { CartService } from "./cart.service";
import { StorageService } from "./storage.service";


/**
 * Responsible for providing authentication services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class AuthService {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  jwtHelper: JwtHelperService = new JwtHelperService();


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public http: HttpClient, 
    public storageService: StorageService,
    public cartService: CartService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public authenticate(credentials: CredentialsDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`, 
      credentials, 
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  public successfulLogin(authorizationValue: string) {
    const user = this.getAuthenticatedUser(authorizationValue);

    this.storageService.setLocalUser(user);
    this.cartService.createOrClearCart();
  }
  

  private getAuthenticatedUser(authorizationValue: string): LocalUserDTO {
    const token = this.extractTokenFromAuthorization(authorizationValue);
    
    return {
      token,
      email: this.jwtHelper.decodeToken(token).sub
    };
  }

  private extractTokenFromAuthorization(authorization: string): string {
    return authorization.substring(7);
  }

  public logout(): void {
    this.storageService.setLocalUser(null);
  }

  public refreshToken() {
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
