export interface Service {
  id?: number;
  name: string;
  office_number: number;
}

export interface AddServiceReq {
  name: string;
  office_number: number;
}