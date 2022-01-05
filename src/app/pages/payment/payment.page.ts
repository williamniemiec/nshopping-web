import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDTO } from 'src/app/dto/payment.dto';
import { ClientOrderDTO } from '../../dto/client-order.dto';


/**
 * Responsible for representing payment page.
 */
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  clientOrder: ClientOrderDTO;
  installments: number[];
  formGroup: FormGroup;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public routeParams: ActivatedRoute,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }

    this.clientOrder = JSON.parse(routeParams.snapshot.params.address);
    this.formGroup = this.buildFormGroup(formBuilder);
    this.installments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  private buildFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      installments: [1],
      "@type": ['cardPayment', Validators.required]
    });
  }

  public nextPage(): void {
    this.clientOrder.payment = this.buildClientOrderPayment();
    this.router.navigateByUrl(
      `client-order-confirmation/${JSON.stringify(this.clientOrder)}`
    );
  }

  private buildClientOrderPayment(): PaymentDTO {
    if (this.formGroup.controls['@type'].value == 'boletoPayment') {
      this.formGroup.controls['installments'].setValue(null);
    }

    return this.formGroup.value;
  }
}
