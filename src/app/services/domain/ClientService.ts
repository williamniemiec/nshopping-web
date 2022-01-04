import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClientDTO } from "../../dto/ClientDTO";
import { ClientNewDTO } from "../../dto/ClientNewDTO";
import { ImageService } from "../ImageService";
import { StorageService } from "../StorageService";

@Injectable(
  { providedIn: 'root' }
)
export class ClientService {

  constructor(public http: HttpClient, public storageService: StorageService, private imageService: ImageService) {
  }

  findById(id: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clients/${id}`
    );
  }

  findByEmail(email: string) {
    return this.http.get(
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

  uploadPicture(picture) {
    const pictureBlob = this.imageService.dataURLtoBlob(picture);
    const formData: FormData = new FormData();

    formData.set('file', pictureBlob, 'picture.png');

    return this.http.post(
      `${API_CONFIG.baseUrl}/clients/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }
}
