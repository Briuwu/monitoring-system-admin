export type Requirement = {
  id: string;
  entity: string;
  department: string;
  complianceList: string;
  documentReference: string;
  typeOfCompliance: string;
  frequencyOfCompliance: string;
  expiration: string;
  renewal: string;
  dateSubmitted: string;
  personInCharge: string;
  status: string;
  uploadedFileUrl: string;
};

export type AddRequirement = Omit<Requirement, "id">;

export type User = {
  id: string;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type UserCredentials = {
  email: string;
  password: string;
};
