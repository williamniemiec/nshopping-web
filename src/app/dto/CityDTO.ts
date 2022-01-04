import { StateDTO } from "./StateDTO";

export interface CityDTO {
  id: string;
  name: string;
  state?: StateDTO;
}
