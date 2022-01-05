import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../dto/product.dto";


/**
 * Responsible for providing product services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class ProductService {
  
  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(public http: HttpClient) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public findByCategory(
    categoryId: string, 
    page: number = 0, 
    linesPerPage: number = 24
  ): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(
      `${API_CONFIG.baseUrl}/products?categories=${categoryId}&page=${page}&linesPerPage=${linesPerPage}`
    );
  }

  public findById(productId: string): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(
      `${API_CONFIG.baseUrl}/products/${productId}`
    );
  }

  public getSmallImageFromBucket(id: string) : Observable<any> {
    return this.http.get(
      `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`, 
      {responseType: 'blob'}
    );
  }

  public getImageFromBucket(id: string) : Observable<any> {
    return this.http.get(
      `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`, 
      {responseType: 'blob'}
    );
  }
}
