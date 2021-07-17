import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../dto/ClientDTO";
import { ClientNewDTO } from "../../dto/ClientNewDTO";
import { StorageService } from "../StorageService";

@Injectable()
export class ClientService {

  constructor(public http: HttpClient, public storageService: StorageService) {
  }

  findByEmail(email: string): Observable<ClientDTO> {
    return this.http.get<ClientDTO>(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`
    );
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;

    return this.http.get(url, {responseType: 'blob'});
  }

  insert(client: ClientNewDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients`,
      client,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
