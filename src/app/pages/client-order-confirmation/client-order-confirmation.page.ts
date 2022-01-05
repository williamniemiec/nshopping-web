import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressDTO } from '../../dto/address.dto';
import { ClientDTO } from '../../dto/client.dto';
import { ClientOrderDTO } from '../../dto/client-order.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { ClientOrderService } from '../../services/domain/client-order.service';
import { ClientService } from '../../services/domain/client.service';


/**
 * Responsible for handling client order confirmation page.
 */
@Component({
  selector: 'page-client-order-confirmation',
  templateUrl: 'client-order-confirmation.page.html',
  styleUrls: ['./client-order-confirmation.page.scss']
})
export class ClientOrderConfirmationPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  clientOrder: ClientOrderDTO;
  cartItems: CartItem[];
  client: ClientDTO;
  address: AddressDTO;
  orderId: string;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public routeParams: ActivatedRoute,
    public clientService: ClientService,
    public cartService: CartService,
    public authService: AuthService,
    public clientOrderService: ClientOrderService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }

    this.clientOrder = JSON.parse(routeParams.snapshot.params.order);
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    this.cartItems = this.cartService.getCart().items;

    this.clientService
      .findById(this.clientOrder.client.id)
      .subscribe(
        (response) => {
          this.client = response as ClientDTO;
          this.address = this.findAddressById(
            this.clientOrder.deliveryAddress.id, 
            response['addresses']
          );
        },
        (_) => {
          this.router.navigateByUrl('home');
        }
      );
  }

  private findAddressById(id: string, list: AddressDTO[]): AddressDTO {
    const position = list.findIndex(item => item.id == id);

    return list[position];
  }

  public total(): number {
    return this.cartService.getTotal();
  }

  public backToCart(): void {
    this.router.navigateByUrl('cart');
  }

  public backToHome(): void {
    this.router.navigateByUrl('home');
  }

  public checkout(): void {
    this.clientOrderService
      .insert(this.clientOrder)
      .subscribe(
        (response) => {
          this.cartService.createOrClearCart();
          this.orderId = this.extractIdFrom(response.headers.get('location'));
        },
        (error) => {
          if (error.status == 403) {
            this.router.navigateByUrl('home');
          }
          else {
            console.error(error);
          }
        }
      );
  }

  private extractIdFrom(location: string): string {
    const position = location.lastIndexOf("/");

    return location.substring(position+1);
  }
}
