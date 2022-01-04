import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/ProductDTO';
import { CartService } from '../../services/CartService';
import { ProductService } from '../../services/domain/ProductService';

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
})
export class ProductDetailPage implements OnInit {

  item: ProductDTO;

  constructor(
    public router: Router, 
    //public navParams: NavParams,
    public routeParams: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService
  ) {
  }

  ngOnInit() {
    const productId = this.routeParams.snapshot.params.id;

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
    this.router.navigateByUrl('cart');
  }

  redirectToCartPage() {
    this.router.navigateByUrl('cart');
  }
}
