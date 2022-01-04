import { ProductDTO } from "../dto/ProductDTO";

export interface CartItem {
  amount: number;
  product: ProductDTO;
}
