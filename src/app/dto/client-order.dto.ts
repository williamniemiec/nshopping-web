import { ClientOrderItemDTO } from "./client-order-item.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";


/**
 * Responsible for representing a client order.
 */
export interface ClientOrderDTO {
  
  client: RefDTO;
  deliveryAddress: RefDTO;
  payment: PaymentDTO;
  products: ClientOrderItemDTO[];
}
