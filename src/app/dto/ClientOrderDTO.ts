import { ClientOrderItemDTO } from "./ClientOrderItemDTO";
import { PaymentDTO } from "./PaymentDTO";
import { RefDTO } from "./RefDTO";

export interface ClientOrderDTO {
  client: RefDTO;
  deliveryAddress: RefDTO;
  payment: PaymentDTO;
  products: ClientOrderItemDTO[];
}
