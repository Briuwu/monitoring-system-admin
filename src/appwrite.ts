import { Account, Client } from "appwrite";

export const client = new Client().setProject(
  import.meta.env.VITE_APP_WRITE_PROJECT_ID
);

export const account = new Account(client);
