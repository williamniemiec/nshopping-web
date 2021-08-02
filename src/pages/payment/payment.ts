import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientOrderDTO } from '../../dto/ClientOrderDTO';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  clientOrder: ClientOrderDTO;
  installments: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.clientOrder = navParams.get('clientOrder');
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

    this.clientOrder.payment = this.formGroup.value;

    this.navCtrl.setRoot('ClientOrderConfirmationPage', {clientOrder: this.clientOrder});
  }
}
