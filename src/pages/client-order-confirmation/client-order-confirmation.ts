import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../dto/AddressDTO';
import { ClientDTO } from '../../dto/ClientDTO';
import { ClientOrderDTO } from '../../dto/ClientOrderDTO';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../services/CartService';
import { ClientOrderService } from '../../services/domain/ClientOrderService';
import { ClientService } from '../../services/domain/ClientService';

@IonicPage()
@Component({
  selector: 'page-client-order-confirmation',
  templateUrl: 'client-order-confirmation.html',
})
export class ClientOrderConfirmationPage {

  clientOrder: ClientOrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderId: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clientService: ClientService,
    public cartService: CartService,
    public clientOrderService: ClientOrderService
  ) {
    this.clientOrder = navParams.get('clientOrder');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService
      .findById(this.clientOrder.client.id)
      .subscribe(
        (response) => {
          this.client = response as ClientDTO;
          this.address = this.findAddressById(this.clientOrder.deliveryAddress.id, response['addresses']);
        },
        (error) => {
          this.navCtrl.setRoot('HomePage');
        }
      );
  }

  private findAddressById(id: string, list: AddressDTO[]): AddressDTO {
    const position = list.findIndex(item => item.id == id);

    return list[position];
  }

  total() {
    return this.cartService.getTotal();
  }

  backToCart() {
    this.navCtrl.setRoot('CartPage');
  }

  backToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  checkout() {
    this.clientOrderService
      .insert(this.clientOrder)
      .subscribe(
        (response) => {
          this.cartService.createOrClearCart();
          this.orderId = this.extractIdFrom(response.headers.get('location'));
        },
        (error) => {
          if (error.status == 403)
            this.navCtrl.setRoot('HomePage');
          else
            console.error(error);
        }
      );
  }

  private extractIdFrom(location: string): string {
    const position = location.lastIndexOf("/");

    return location.substring(position+1);
  }
}
