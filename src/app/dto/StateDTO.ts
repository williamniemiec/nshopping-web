export interface StateDTO {
  id: string;
  name: string;
  state?: StateDTO;
}