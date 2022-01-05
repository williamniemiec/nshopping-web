import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { CategoryDTO } from "../../dto/category.dto";


/**
 * Responsible for providing category services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class CategoryService {
  
  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  constructor(
    public http: HttpClient
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public findAll(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(
      `${API_CONFIG.baseUrl}/categories`
    );
  }
}
