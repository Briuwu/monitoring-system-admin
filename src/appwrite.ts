import { Account, Client, Storage } from "appwrite";

export const projectId = import.meta.env.PROD
  ? import.meta.env.VITE_APP_WRITE_PROJECT_ID_PROD
  : import.meta.env.VITE_APP_WRITE_PROJECT_ID_DEV;

export const endpointUrl = import.meta.env.PROD
  ? import.meta.env.VITE_APP_WRITE_ENDPOINT_PROD
  : import.meta.env.VITE_APP_WRITE_ENDPOINT_DEV;

export const client = new Client()
  .setEndpoint(endpointUrl)
  .setProject(projectId);

export const account = new Account(client);
export const storage = new Storage(client);

export const bucketId = import.meta.env.PROD
  ? import.meta.env.VITE_APP_WRITE_BUCKET_ID_PROD
  : import.meta.env.VITE_APP_WRITE_BUCKET_ID_DEV;

export const url = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;
