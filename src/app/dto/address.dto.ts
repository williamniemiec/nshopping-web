import { CityDTO } from "./city.dto";


/**
 * Responsible for representing an address.
 */
export interface AddressDTO {
  
  id: string;
  streetName: string;
  number: string;
  apt?: string;
  district: string;
  zip: string;
  city: CityDTO; 
}
