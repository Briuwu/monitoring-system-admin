export type Requirements = {
  id: string;
  compliance_list: string;
  department: string;
  entity: string;
  frequency_of_compliance: string;
  type_of_compliance: string;
  date_submitted: Date;
  expiration: Date;
  remaining_days: number;
  renewal: Date;
  person_in_charge: string;
  status: string;
  document_reference: string;
};

export const requirements: Requirements[] = [
  {
    id: "1",
    compliance_list: "Annual Financial Report",
    department: "Finance",
    entity: "Company A",
    frequency_of_compliance: "Annually",
    type_of_compliance: "Financial",
    date_submitted: new Date("2023-01-15"),
    expiration: new Date("2024-01-15"),
    renewal: new Date("2024-01-01"),
    person_in_charge: "John Doe",
    status: "Submitted",
    document_reference: "AFR-2023-01",
    remaining_days: 15,
  },
  {
    id: "2",
    compliance_list: "Health and Safety Inspection",
    department: "HR",
    entity: "Company B",
    frequency_of_compliance: "Quarterly",
    type_of_compliance: "Safety",
    date_submitted: new Date("2023-03-10"),
    expiration: new Date("2023-06-10"),
    renewal: new Date("2023-05-25"),
    person_in_charge: "Jane Smith",
    status: "Pending",
    document_reference: "HSI-2023-Q1",
    remaining_days: 10,
  },
  {
    id: "3",
    compliance_list: "Environmental Impact Assessment",
    department: "Operations",
    entity: "Company C",
    frequency_of_compliance: "Biannually",
    type_of_compliance: "Environmental",
    date_submitted: new Date("2023-02-20"),
    expiration: new Date("2023-08-20"),
    renewal: new Date("2023-08-05"),
    person_in_charge: "Alice Johnson",
    status: "Approved",
    document_reference: "EIA-2023-H1",
    remaining_days: 5,
  },
];
