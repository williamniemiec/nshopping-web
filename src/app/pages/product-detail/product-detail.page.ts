import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/product.dto';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/domain/product.service';


/**
 * Responsible for representing product detail page.
 */
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
})
export class ProductDetailPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  item: ProductDTO;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public routeParams: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService,
    public authService: AuthService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    const productId = this.routeParams.snapshot.params.id;

    this.productService
      .findById(productId)
      .subscribe(
        (product) => {
          this.item = product;
          this.getImageIfExists();
        },
        (_) => {}
      );
  }

  private getImageIfExists(): void {
    this.productService
      .getImageFromBucket(this.item.id)
      .subscribe(
        (_) => {
          this.item.imageUrl = this.generateImageUrlForProduct(this.item);
        },
        (_) => {}
      );
  }

  private generateImageUrlForProduct(product: ProductDTO): string {
    return `${API_CONFIG.bucketBaseUrl}/prod${product.id}.jpg`;
  }

  public addToCart(item: ProductDTO): void {
    this.cartService.addProduct(item);
    this.router.navigateByUrl('cart');
  }

  public redirectToCartPage(): void {
    this.router.navigateByUrl('cart');
  }
}
