import { ProductDTO } from "../dto/product.dto";

export interface CartItem {
  amount: number;
  product: ProductDTO;
}
