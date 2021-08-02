import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/ProductDTO';
import { CartService } from '../../services/CartService';
import { ProductService } from '../../services/domain/ProductService';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  item: ProductDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService
  ) {
  }

  ionViewDidLoad() {
    const productId = this.navParams.get('productId');

    this.productService
      .findById(productId)
      .subscribe(
        (response) => {
          this.item = response;
          this.getImageIfExists();
        },
        (error) => {}
      );
  }

  getImageIfExists() {
    this.productService
      .getImageFromBucket(this.item.id)
      .subscribe(
        (response) => {
          this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
        },
        (error) => {
        }
      );
  }

  addToCart(item: ProductDTO) {
    this.cartService.addProduct(item);
    this.navCtrl.setRoot('CartPage');
  }
}
