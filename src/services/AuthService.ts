import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../dto/CredentialsDTO";
import { LocalUserDTO } from "../dto/LocalUserDTO";
import { StorageService } from "./StorageService";

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storageService: StorageService) {

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
