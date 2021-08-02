import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProductDTO } from '../../dto/ProductDTO';
import { ProductService } from '../../services/domain/ProductService';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[] = [];
  page: number = 0;
  linesPerPage: number = 10;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public productService: ProductService,
    public loadingCtrl: LoadingController
  ) {
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
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

  ionViewDidLoad() {
    this.loadProducts();
  }

  loadProducts() {
    const categoryId = this.navParams.get('categoryId');
    const loader = this.presentLoading();

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
    this.navCtrl.push('ProductDetailPage', {productId});
  }

  loadMoreProducts(infiniteScroll) {
    this.page++;
    this.loadProducts();

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
