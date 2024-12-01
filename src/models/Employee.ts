export interface Employee {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  salary: number;
  service_name?: string;
  service_id: string;
}

export interface Manager extends Employee {
  start_date: string;
}

export interface ManagerParams {
  id: string;
}