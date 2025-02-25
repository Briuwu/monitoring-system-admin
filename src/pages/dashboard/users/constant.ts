export type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  department: string;
};

export const users: User[] = [
  {
    id: 1,
    firstName: "Brian Laurence",
    middleName: "Esquilon",
    lastName: "Millonte",
    email: "millontebry@gmail.com",
    department: "IT",
  },
  {
    id: 2,
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    email: "johnsmith@email.com",
    department: "HR",
  },
  {
    id: 3,
    firstName: "Al-jon",
    middleName: "Bilo",
    lastName: "Santiago",
    email: "aljonsantiago@email.com",
    department: "IT",
  },
  {
    id: 4,
    firstName: "Jeran Christopher",
    middleName: "Dinglasan",
    lastName: "Merino",
    email: "jeranmerino@email.com",
    department: "IT",
  },
];
