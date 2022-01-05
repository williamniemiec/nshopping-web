import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/product.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/domain/product.service';

@Component({
  selector: 'page-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    public router: Router, 
    //public navParams: NavParams, 
    public routeParams: ActivatedRoute,
    public cartService: CartService,
    public productService: ProductService
  ) {
  }

  ngOnInit() {
    const cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      this.productService
        .getSmallImageFromBucket(item.product.id)
        .subscribe(
          (response) => {
            item.product.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`;
          },
          (error) => {}
        );
    }
  }

  removeProduct(product: ProductDTO) {
    this.items = this.cartService.removeProduct(product).items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  goOn() {
    this.router.navigateByUrl('categories');
  }

  checkout() {
    this.router.navigateByUrl('pick-address');
  }
}
