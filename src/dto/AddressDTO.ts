import { CityDTO } from "./CityDTO";

export interface AddressDTO {
  id: string;
  streetName: string;
  number: string;
  apt?: string;
  district: string;
  zip: string;
  city: CityDTO; 
}
