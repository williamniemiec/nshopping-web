import { RefDTO } from "./ref.dto";


/**
 * Responsible for representing an item from a client order.
 */
export interface ClientOrderItemDTO {
  
  amount: number;
  product: RefDTO;
}
