import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoryDTO } from '../../dto/CategoryDTO';
import { CategoryService } from '../../services/domain/CategoryService';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  items: CategoryDTO[];
  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoryService: CategoryService
  ) {
  }

  ionViewDidLoad() {
    this.categoryService
      .findAll()
      .subscribe(
        (response) => this.items = response,
        (error) => {}
      );
  }

  showProducts(categoryId: string) {
    this.navCtrl.push("ProductsPage", {categoryId});
  }
}
