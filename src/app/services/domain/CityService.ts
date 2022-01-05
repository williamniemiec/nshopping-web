import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { CityDTO } from "../../dto/city.dto";

@Injectable(
  { providedIn: 'root' }
)
export class CityService {
  
  constructor(public http: HttpClient) {
  }

  findAll(stateId: string): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${stateId}/cities`);
  }
}
