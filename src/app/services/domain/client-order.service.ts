import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { ClientOrderDTO } from "../../dto/client-order.dto";


/**
 * Responsible for providing client order services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class ClientOrderService {
  
  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public http: HttpClient) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public insert(order: ClientOrderDTO) {
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
