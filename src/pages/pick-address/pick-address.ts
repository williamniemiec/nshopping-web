import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../dto/AddressDTO';
import { ClientOrderDTO } from '../../dto/ClientOrderDTO';
import { ClientOrderItemDTO } from '../../dto/ClientOrderItemDTO';
import { CartService } from '../../services/CartService';
import { ClientService } from '../../services/domain/ClientService';
import { StorageService } from '../../services/StorageService';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: AddressDTO[];
  clientOrder: ClientOrderDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public clientService: ClientService,
    public cartService: CartService
  ) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();

    if (localUser && localUser.email) {
      this.clientService
        .findByEmail(localUser.email)
        .subscribe(
          (response) => {
            this.items = response['addresses'];

            const cart = this.cartService.getCart();
            const clientOrderList = cart.items.map(item => (
              {
                amount: item.amount, 
                product: {id: item.product.id}
              }
            ));

            this.clientOrder = {
              client: {id: response['id']},
              deliveryAddress: null,
              payment: null,
              products: clientOrderList as ClientOrderItemDTO[]
            }
          },
          (error) => {
            this.navCtrl.setRoot('HomePage');
          }
      );
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  handleAddressSelection(address: AddressDTO) {
    this.clientOrder.deliveryAddress = {id: address.id}
    this.navCtrl.push('PaymentPage', {clientOrder: this.clientOrder});
  }
}
