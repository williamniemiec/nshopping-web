/**
 * Responsible for representing a state.
 */
export interface StateDTO {
  id: string;
  name: string;
  state?: StateDTO;
}