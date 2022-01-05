import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/product.dto';
import { ProductService } from '../../services/domain/product.service';


/**
 * Responsible for representing products page.
 */
@Component({
  selector: 'page-products',
  templateUrl: 'products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  items: ProductDTO[] = [];
  page: number = 0;
  linesPerPage: number = 10;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    private routeParams: ActivatedRoute,
    public productService: ProductService,
    public loadingCtrl: LoadingController,
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
    this.loadProducts();
  }

  public doRefresh(refresher): void {
    this.page = 0;
    this.items = [];
    this.loadProducts();
    
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  private async loadProducts(): Promise<void> {
    const categoryId = this.routeParams.snapshot.params.id;
    const loader = await this.presentLoading();

    this.productService
      .findByCategory(categoryId, this.page, this.linesPerPage)
      .subscribe(
        (response) => {
          this.items = this.items.concat(response['content']);
          this.loadImageUrls();
          loader.dismiss();
        },
        (_) => {
          loader.dismiss();
        }
      );
  }

  private async presentLoading(): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });

    loader.present();
    
    return loader;
  }

  private loadImageUrls(): void {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      this.productService
        .getSmallImageFromBucket(item.id)
        .subscribe(
          (_) => {
            item.imageUrl = this.generateImageUrlForProduct(item);
          },
          (_) => {}
        );
    }

  }

  private generateImageUrlForProduct(product: ProductDTO): string {
    return `${API_CONFIG.bucketBaseUrl}/prod${product.id}-small.jpg`;
  }

  public showDetails(productId: string): void {
    this.router.navigateByUrl(`product-detail/${productId}`);
  }

  public loadMoreProducts(infiniteScroll): void {
    this.page++;
    this.loadProducts();

    setTimeout(() => {
      infiniteScroll.target.complete();
    }, 1000);
  }

  public redirectToCartPage(): void {
    this.router.navigateByUrl('cart');
  }
}
