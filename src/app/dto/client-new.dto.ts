/**
 * Responsible for representing a new client.
 */
export interface ClientNewDTO {
  
  name: string;
  email: string;
  password: string;
  documentId: string;
  type: number;
  streetName: string;
  number: string;
  apt?: string;
  district: string;
  zip: string;
  cityId: number;
  phone1: string;
  phone2?: string;
  phone3?: string;
}
