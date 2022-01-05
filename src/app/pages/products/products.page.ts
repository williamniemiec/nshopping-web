import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams } from '@ionic/angular';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/product.dto';
import { ProductService } from '../../services/domain/ProductService';

@Component({
  selector: 'page-products',
  templateUrl: 'products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit {

  items: ProductDTO[] = [];
  page: number = 0;
  linesPerPage: number = 10;

  constructor(
    public router: Router, 
    private routeParams: ActivatedRoute,
    public productService: ProductService,
    public loadingCtrl: LoadingController
  ) {
  }

  async presentLoading() {
    const loader = await this.loadingCtrl.create({
      message: "Please wait..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadProducts();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const categoryId = this.routeParams.snapshot.params.id;
    const loader = await this.presentLoading();

    this.productService
      .findByCategory(categoryId, this.page, this.linesPerPage)
      .subscribe(
        (response) => {
          const start = this.items.length;
          this.items = this.items.concat(response['content']);
          const end = this.items.length - 1;
          this.loadImageUrls(start, end);
          loader.dismiss();
        },
        (error) => {
          loader.dismiss();
        }
      );
      
     //console.log('PRODUCTS PARAMS: ', this.routeParams.params.subscribe((p) => console.log(p.id)));
     //console.log(this.routeParams.snapshot.params)
  }

  loadImageUrls(start: number, end: number) {
    for (let i = start; i < end; i++) {
      let item = this.items[i];

      this.productService
        .getSmallImageFromBucket(item.id)
        .subscribe(
          (response) => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },
          (error) => {}
        );
    }
  }

  showDetails(productId: string) {
    this.router.navigateByUrl(`product-detail/${productId}`);
  }

  loadMoreProducts(infiniteScroll) {
    this.page++;
    this.loadProducts();

    setTimeout(() => {
      infiniteScroll.target.complete();
    }, 1000);
  }

  redirectToCartPage() {
    this.router.navigateByUrl('cart');
  }
}
