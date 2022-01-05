import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { StateDTO } from "../../dto/state.dto";


/**
 * Responsible for providing state services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class StateService {
  
  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public http: HttpClient) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public findAll(): Observable<StateDTO[]> {
    return this.http.get<StateDTO[]>(
      `${API_CONFIG.baseUrl}/states`
    );
  }
}
