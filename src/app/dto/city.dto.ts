import { StateDTO } from "./state.dto";


/**
 * Responsible for representing a city.
 */
export interface CityDTO {
  
  id: string;
  name: string;
  state?: StateDTO;
}
