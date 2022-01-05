import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';


/**
 * Responsible for intercepting and handling application errors.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements ErrorHandler {

  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public handleError(error: any): void {
    const Dt = new Date().toISOString();

    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    }
    else if (error instanceof TypeError) {
      this.handleTypeError(error);
    }
    else if (error instanceof Error) {
      this.handleGeneralError(error);
    }
    else {
      this.handleUnknownError(error);
    }
  }

  private handleHttpError(error: any): void {
    this.generateLog('\r\nStatus code:' + (<HttpErrorResponse>error).status);
  }

  private generateLog(message: string) {
    console.log(this.getCurrentTime(), message);
  }

  private getCurrentTime(): String {
    return new Date().toISOString();
  }

  private handleTypeError(error: any): void {
    this.generateLog('\r\nType Error: ' + error.message);
  }

  private handleGeneralError(error: any): void {
    this.generateLog('\r\General Error: ' + error.message);
  }

  private handleUnknownError(error: any): void {
    this.generateLog('\r\nUnknown Error: ' + error.message);
  }
}


/**
 * Responsible for providing HTTP error interceptor.
 */
export const ErrorInterceptorProvider = {

  provide: ErrorHandler,
  useClass: ErrorInterceptor,
  multi: true,
};
