import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { AddressDTO } from '../../dto/AddressDTO';
import { ClientOrderDTO } from '../../dto/ClientOrderDTO';
import { ClientOrderItemDTO } from '../../dto/ClientOrderItemDTO';
import { CartService } from '../../services/CartService';
import { ClientService } from '../../services/domain/ClientService';
import { StorageService } from '../../services/StorageService';

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
