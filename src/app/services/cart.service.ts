import { Injectable } from "@angular/core";
import { ProductDTO } from "../dto/product.dto";
import { Cart } from "../models/cart";
import { StorageService } from "./storage.service";


/**
 * Responsible for providing cart services.
 */
@Injectable(
  { providedIn: 'root' }
)
export class CartService {

  //---------------------------------------------------------------------------
  //		Constructor
  //---------------------------------------------------------------------------
  constructor(
    public storageService: StorageService
  ) {
  }


  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public createOrClearCart(): Cart {
    const cart: Cart = {
      items: []
    }

    this.storageService.setCart(cart);

    return cart;
  }

  public getCart(): Cart {
    let cart  = this.storageService.getCart();

    if (cart == null)
      cart = this.createOrClearCart();

    return cart;
  }

  public addProduct(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position == -1) {
      cart.items.push({amount: 1, product});
    }

    this.storageService.setCart(cart);

    return cart;
  }

  public removeProduct(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position != -1) {
      cart.items.splice(position, 1);
    }

    this.storageService.setCart(cart);

    return cart;
  }

  public increaseQuantity(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position != -1) {
      cart.items[position].amount++;
    }

    this.storageService.setCart(cart);

    return cart;
  }

  public decreaseQuantity(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position != -1) {
      cart.items[position].amount--;

      if (cart.items[position].amount < 1)
        cart = this.removeProduct(product);
    }

    this.storageService.setCart(cart);

    return cart;
  }

  public getTotal(): number {
    let cart = this.getCart();
    let sum = 0;

    for (let item of cart.items) {
      sum += item.product.price * item.amount;
    }

    return sum;
  }
}
