import { ProductDTO } from "../dto/product.dto";


/**
 * Responsible for defining an item from a cart.
 */
export interface CartItem {

  amount: number;
  product: ProductDTO;
}
