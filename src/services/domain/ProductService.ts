import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ProductDTO } from "../../dto/ProductDTO";

@Injectable()
export class ProductService {
  
  constructor(public http: HttpClient) {
  }

  findByCategory(categoryId: string, page: number = 0, linesPerPage: number = 24): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${API_CONFIG.baseUrl}/products?categories=${categoryId}&page=${page}&linesPerPage=${linesPerPage}`);
  }

  findById(productId: string): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${productId}`);
  }

  getSmallImageFromBucket(id: string) : Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;

    return this.http.get(url, {responseType: 'blob'});
  }

  getImageFromBucket(id: string) : Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;

    return this.http.get(url, {responseType: 'blob'});
  }
}
