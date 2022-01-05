import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/product.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/domain/product.service';


/**
 * Responsible for handling cart page.
 */
@Component({
  selector: 'page-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  items: CartItem[];


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public routeParams: ActivatedRoute,
    public cartService: CartService,
    public authService: AuthService,
    public productService: ProductService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/home');
    }
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    this.items = this.loadCartItems();
    this.loadImageUrls();
  }

  private loadCartItems(): CartItem[] {
    const cart = this.cartService.getCart();
    
    return cart.items;
  }

  private loadImageUrls(): void {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      this.productService
        .getSmallImageFromBucket(item.product.id)
        .subscribe(
          (_) => {
            item.product.imageUrl = this.buildProductImageUrl(item);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  private buildProductImageUrl(item): string {
    return `${API_CONFIG.bucketBaseUrl}/prod${item.product.id}-small.jpg`;
  }

  public removeProduct(product: ProductDTO): void {
    this.items = this.cartService.removeProduct(product).items;
  }

  public increaseQuantity(product: ProductDTO): void {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  public decreaseQuantity(product: ProductDTO): void {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  public getTotal(): number {
    return this.cartService.getTotal();
  }

  public goOn(): void {
    this.router.navigateByUrl('categories');
  }

  public checkout(): void {
    this.router.navigateByUrl('pick-address');
  }
}
