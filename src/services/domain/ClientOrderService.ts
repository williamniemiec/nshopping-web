import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { ClientOrderDTO } from "../../dto/ClientOrderDTO";

@Injectable()
export class ClientOrderService {
  
  constructor(public http: HttpClient) {
  }

  insert(order: ClientOrderDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/orders`, 
      order,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
  }
}
