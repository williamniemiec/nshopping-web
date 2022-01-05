import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressDTO } from '../../dto/address.dto';
import { ClientOrderDTO } from '../../dto/client-order.dto';
import { ClientOrderItemDTO } from '../../dto/client-order-item.dto';
import { CartService } from '../../services/cart.service';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';


/**
 * Responsible for representing pick address page.
 */
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.page.html',
  styleUrls: ['./pick-address.page.scss']
})
export class PickAddressPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  items: AddressDTO[];
  clientOrder: ClientOrderDTO;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public routeParams: ActivatedRoute,
    public storageService: StorageService,
    public clientService: ClientService,
    public cartService: CartService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    let localUser = this.storageService.getLocalUser();

    if (this.isAuthenticated()) {
      this.clientService
        .findByEmail(localUser.email)
        .subscribe(
          (client) => {
            this.parseAuthenticatedClient(client)
          },
          (_) => {
            this.router.navigateByUrl('home');
          }
      );
    }
    else {
      this.router.navigateByUrl('home');
    }
  }

  private isAuthenticated(): boolean {
    const localUser = this.storageService.getLocalUser();

    return  (localUser != null)
            && (localUser != undefined)
            && (localUser.email != null)
            && (localUser.email != undefined);
  }

  private parseAuthenticatedClient(client): void {
    this.clientOrder = {
      client: { id: client['id'] },
      deliveryAddress: null,
      payment: null,
      products: this.parseClientCart()
    }
    this.items = client['addresses'];
  }

  private parseClientCart(): ClientOrderItemDTO[] {
    const cart = this.cartService.getCart();
    
    return cart.items.map(item => (
      {
        amount: item.amount, 
        product: {id: item.product.id}
      }
    )) as ClientOrderItemDTO[];
  }

  public handleAddressSelection(address: AddressDTO): void {
    this.clientOrder.deliveryAddress = {id: address.id};
    this.router.navigateByUrl(`payment/${JSON.stringify(this.clientOrder)}`);
  }
}
