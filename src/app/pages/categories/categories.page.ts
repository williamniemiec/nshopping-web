import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';
import { CategoryDTO } from '../../dto/CategoryDTO';
import { CategoryService } from '../../services/domain/CategoryService';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['./categories.page.scss']
})
export class CategoriesPage implements OnInit {

  items: CategoryDTO[];
  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public router: Router, 
    //public navParams: NavParams,
    public routeParams: ActivatedRoute,
    public categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.categoryService
      .findAll()
      .subscribe(
        (response) => this.items = response,
        (error) => {}
      );
  }

  showProducts(categoryId: string) {
    this.router.navigateByUrl('products/' + categoryId);
  }

  redirectToCartPage() {
    this.router.navigateByUrl('cart');
  }
}
