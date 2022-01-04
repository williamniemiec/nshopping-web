import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientOrderDTO } from '../../dto/ClientOrderDTO';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage {

  clientOrder: ClientOrderDTO;
  installments: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    public router: Router, 
    //public navParams: NavParams,
    public routeParams: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    //this.clientOrder = navParams.get('clientOrder');
    this.formGroup = formBuilder.group({
      installments: [1],
      "@type": ['cardPayment', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log(this.clientOrder);
  }

  nextPage() {
    if (this.formGroup.controls['@type'].value == 'boletoPayment')
      this.formGroup.controls['installments'].setValue(null);

    //this.clientOrder.payment = this.formGroup.value;

    //this.navCtrl.setRoot('ClientOrderConfirmationPage', {clientOrder: this.clientOrder});
  }
}
