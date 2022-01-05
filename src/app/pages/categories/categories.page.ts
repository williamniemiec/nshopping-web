import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API_CONFIG } from '../../config/api.config';
import { CategoryDTO } from '../../dto/category.dto';
import { CategoryService } from '../../services/domain/category.service';


/**
 * Responsible for handling categories page.
 */
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['./categories.page.scss']
})
export class CategoriesPage implements OnInit {

  //---------------------------------------------------------------------------
  //		Attributes
  //---------------------------------------------------------------------------
  items: CategoryDTO[];
  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;


  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public router: Router, 
    public routeParams: ActivatedRoute,
    public categoryService: CategoryService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public ngOnInit(): void {
    this.categoryService
      .findAll()
      .subscribe(
        (categories) => this.items = categories,
        (error) => {
          console.error(error);
        }
      );
  }

  public showProducts(categoryId: string): void {
    this.router.navigateByUrl(`products/${categoryId}`);
  }

  public redirectToCartPage(): void {
    this.router.navigateByUrl('cart');
  }
}
