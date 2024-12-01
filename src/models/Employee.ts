export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  service_name: string;
}

export interface Manager extends Employee {
  start_date: string;
}

export interface ManagerParams {
  id: string;
}