import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressDTO } from '../../dto/address.dto';
import { ClientDTO } from '../../dto/client.dto';
import { ClientOrderDTO } from '../../dto/client-order.dto';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../services/CartService';
import { ClientOrderService } from '../../services/domain/ClientOrderService';
import { ClientService } from '../../services/domain/ClientService';

@Component({
  selector: 'page-client-order-confirmation',
  templateUrl: 'client-order-confirmation.page.html',
  styleUrls: ['./client-order-confirmation.page.scss']
})
export class ClientOrderConfirmationPage implements OnInit {

  clientOrder: ClientOrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderId: string;

  constructor(
    public router: Router, 
    //public navParams: NavParams,
    public routeParams: ActivatedRoute,
    public clientService: ClientService,
    public cartService: CartService,
    public clientOrderService: ClientOrderService
  ) {
    this.clientOrder = JSON.parse(routeParams.snapshot.params.order);
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService
      .findById(this.clientOrder.client.id)
      .subscribe(
        (response) => {
          this.client = response as ClientDTO;
          this.address = this.findAddressById(this.clientOrder.deliveryAddress.id, response['addresses']);
        },
        (error) => {
          this.router.navigateByUrl('home');
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
    this.router.navigateByUrl('cart');
  }

  backToHome() {
    this.router.navigateByUrl('home');
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
            this.router.navigateByUrl('home');
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
