import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from '../models/field-message';


/**
 * Responsible for intercepting and handling http errors.
 */
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public storageService: StorageService, 
    public alertController: AlertController
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .toPromise()
      .catch((error) => {
        let errorObj = this.parseError(error);

        return throwError(errorObj);
      }) as any;
  }

  private parseError(error: any) {
    let errorObj = error;

    if (errorObj.error) {
      errorObj = errorObj.error;
    }

    if (!errorObj.status) {
      errorObj = JSON.parse(errorObj);
    }

    switch (errorObj.status) {
      case 401:
        this.handle401();
        break;
      case 403:
        this.handle403();
        break;
      case 422:
        this.handle422(errorObj);
        break;
      default:
        this.handleDefaultError(errorObj);
    }
    
    return errorObj;
  }

  private async handle401() {
    const alert = await this.createAlert(
      '401 Error: Authentication error', 
      'Incorrect email and / or password'
    );

    alert.present();
  }

  private async createAlert(title: string, message: string) {
    return this.alertController.create({
      header: title,
      message: message,
      backdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });
  }

  private handle403() {
    this.storageService.setLocalUser(null);
  }

  private async handle422(errorObj) {
    const alert = await this.createAlert(
      '422 Error: Validation', 
      this.listErrors(errorObj.errors)
    );

    alert.present();
  }

  private listErrors(messages : FieldMessage[]) : string {
    let htmlCode : string = '';
    
    for (let i = 0; i < messages.length; i++) {
      htmlCode += this.generateHtmlForFieldMessage(messages[i]);
    }

    return htmlCode;
  }

  private generateHtmlForFieldMessage(message: FieldMessage) {
    return  '<p><strong>' 
            + message.fieldName 
            + "</strong>: " 
            + message.message 
            + '</p>';
  }

  private async handleDefaultError(error) {
    const alert = await this.createAlert(
      error.status + ' Error: ' + error.error, 
      error.message
    );

    alert.present();
  }
}


/**
 * Responsible for providing HTTP error interceptor.
 */
export const HttpErrorInterceptorProvider = {

  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true,
};
