export type Requirement = {
  $id: string;
  entity: string;
  department: string;
  complianceList: string;
  complianceType: string;
  documentReference: string;
  typeOfCompliance: string;
  frequencyOfCompliance: string;
  expiration: string;
  renewal: string;
  dateSubmitted: string;
  personInCharge: string;
  status: string;
  uploadedFileUrl: string;
  onProcessedDate: string;
};

export type ActivityLogs = {
  $id: string;
  userId: string;
  email: string;
  action: string;
  department: string;
  $createdAt: string;
};

export type AddActivityLog = Omit<ActivityLogs, "$id" | "$createdAt">;

export type UpdateRequirement = Omit<
  Requirement,
  "$id" | "uploadedFileUrl" | "documentReference" | "renewal"
>;

export type AddRequirement = Omit<Requirement, "$id">;

export type User = {
  $id: string;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
};

export type AddUser = Omit<User, "$id">;

export type UpdateUserInfo = User;
