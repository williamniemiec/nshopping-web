import { STORAGE_KEYS } from "../config/storageKeys.config";
import { LocalUserDTO } from "../dto/local-user.dto";
import { Cart } from "../models/cart";


/**
 * Responsible for handling local storage.
 */
export class StorageService {

  //---------------------------------------------------------------------------
  //		Methods
  //---------------------------------------------------------------------------
  public getLocalUser(): LocalUserDTO {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);

    if (user == null) {
      return null;
    }

    return JSON.parse(user);
  }

  public setLocalUser(user: LocalUserDTO): void {
    if (user == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
    }
  }

  public getCart(): Cart {
    let cart = localStorage.getItem(STORAGE_KEYS.cart);

    if (cart == null) {
      return null;
    }

    return JSON.parse(cart);
  }

  public setCart(cart: Cart) {
    if (cart == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
    else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    }
  }
}
