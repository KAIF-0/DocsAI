import { env } from "../../env";
import { Account, Client } from "appwrite";

export const client = new Client();

if (!env.APPWRITE_URL || !env.APPWRITE_PROJECT_ID) {
  throw new Error(
    "APPWRITE_URL and APPWRITE_PROJECT_ID must be defined in the environment variables."
  );
}

client.setEndpoint(env.APPWRITE_URL).setProject(env.APPWRITE_PROJECT_ID);

export const account = new Account(client);
