import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredentialsDTO } from "../dto/CredentialsDTO";
import { LocalUserDTO } from "../dto/LocalUserDTO";
import { ProductDTO } from "../dto/ProductDTO";
import { Cart } from "../models/Cart";
import { StorageService } from "./StorageService";

@Injectable(
  { providedIn: 'root' }
)
export class CartService {

  constructor(public storageService: StorageService) {

  }

  createOrClearCart(): Cart {
    const cart: Cart = {
      items: []
    }

    this.storageService.setCart(cart);

    return cart;
  }

  getCart(): Cart {
    let cart  = this.storageService.getCart();

    if (cart == null)
      cart = this.createOrClearCart();

    return cart;
  }

  addProduct(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position == -1) {
      cart.items.push({amount: 1, product});
    }

    this.storageService.setCart(cart);

    return cart;
  }

  removeProduct(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position != -1) {
      cart.items.splice(position, 1);
    }

    this.storageService.setCart(cart);

    return cart;
  }

  increaseQuantity(product: ProductDTO): Cart {
    let cart = this.getCart();
    let position = cart.items.findIndex(item => item.product.id == product.id);

    if (position != -1) {
      cart.items[position].amount++;
    }

    this.storageService.setCart(cart);

    return cart;
  }

  decreaseQuantity(product: ProductDTO): Cart {
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

  getTotal(): number {
    let cart = this.getCart();
    let sum = 0;

    for (let item of cart.items) {
      sum += item.product.price * item.amount;
    }

    return sum;
  }
}
