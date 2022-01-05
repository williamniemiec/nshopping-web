import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { AddressDTO } from '../../dto/address.dto';
import { ClientOrderDTO } from '../../dto/client-order.dto';
import { ClientOrderItemDTO } from '../../dto/client-order-item.dto';
import { CartService } from '../../services/cart.service';
import { ClientService } from '../../services/domain/client.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.page.html',
  styleUrls: ['./pick-address.page.scss']
})
export class PickAddressPage implements OnInit {

  items: AddressDTO[];
  clientOrder: ClientOrderDTO;

  constructor(
    public router: Router, 
    //public navParams: NavParams,
    public routeParams: ActivatedRoute,
    public storageService: StorageService,
    public clientService: ClientService,
    public cartService: CartService
  ) {
  }

  ngOnInit() {
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
            this.router.navigateByUrl('home');
          }
      );
    }
    else {
      this.router.navigateByUrl('home');
    }
  }

  handleAddressSelection(address: AddressDTO) {
    this.clientOrder.deliveryAddress = {id: address.id}
    this.router.navigateByUrl(`payment/${JSON.stringify(this.clientOrder)}`);
  }
}
