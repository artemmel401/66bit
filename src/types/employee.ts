export interface Employee {
  id: number,
  name: string,
  photo: string,
  phone: string,
  gender: string,
  position: string,
  stack: string[],
  birthdate: string,
  dateOfEmployment: string
}

export interface TableEmployee {
  name: string;
  backName:  keyof Employee
}