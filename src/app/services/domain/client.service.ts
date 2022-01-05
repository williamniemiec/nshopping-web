import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ClientNewDTO } from "../../dto/client-new.dto";
import { ImageService } from "../image.service";
import { StorageService } from "../storage.service";


/**
 * Responsible for providing client services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class ClientService {

  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public http: HttpClient, 
    public storageService: StorageService, 
    private imageService: ImageService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public findById(id: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clients/${id}`
    );
  }

  public findByEmail(email: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/clients/email?value=${email}`
    );
  }

  public getImageFromBucket(id: string): Observable<any> {
    return this.http.get(
      `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`, 
      {responseType: 'blob'}
    );
  }

  public insert(client: ClientNewDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/clients`,
      client,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  public uploadPicture(picture) {
    const formData = this.generateFormDataForPicture(picture);

    return this.http.post(
      `${API_CONFIG.baseUrl}/clients/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  private generateFormDataForPicture(picture): FormData {
    const formData = new FormData();
    const pictureBlob = this.convertDataUrlToBlob(picture);

    formData.set(
      'file', 
      pictureBlob, 
      'picture.png'
    );

    return formData;
  }

  private convertDataUrlToBlob(dataUrl): Blob {
    return this.imageService.dataURLtoBlob(dataUrl);
  }
}
