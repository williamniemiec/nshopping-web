import { CategoriesPageRoutingModule } from './categories-routing.module';
import { NgModule } from '@angular/core';
import { CategoriesPage } from './categories.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    CategoriesPage,
  ],
  imports: [
    CommonModule,
    IonicModule,
    CategoriesPageRoutingModule
  ],
})
export class CategoriesPageModule {}
