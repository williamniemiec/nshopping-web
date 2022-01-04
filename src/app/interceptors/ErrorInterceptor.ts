import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/StorageService';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from '../models/FieldMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storageService: StorageService, public alertController: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      /*
      .catch((error, caught) => {
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

        console.log("Interceptor - error:");
        console.log(errorObj);

        return Observable.throw(errorObj);
      }) as any;*/
      
  }

  async handle401() {
    const alert = await this.alertController.create({
      header: '401 Error: Authentication error',
      message: 'Incorrect email and / or password',
      backdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });

    alert.present();
  }

  handle403() {
    this.storageService.setLocalUser(null);
  }

  async handle422(errorObj) {
    const alert = await this.alertController.create({
      header: '422 Error: Validation',
      message: this.listErrors(errorObj.errors),
      backdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });

    alert.present();
  }

  private listErrors(messages : FieldMessage[]) : string {
    let s : string = '';
    for (var i=0; i<messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }

  async handleDefaultError(error) {
    const alert = await this.alertController.create({
      header: error.status + ' Error: ' + error.error,
      message: error.message,
      backdropDismiss: false,
      buttons: [
        {text: 'Ok'}
      ]
    });

    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};