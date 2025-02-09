"use client";
import { client, account } from "@/configs/appwrite/appwrite-config";
import { env } from "@/env";
import { OAuthProvider } from "appwrite";

export const loginWithOAuth = async (provider) => {
  try {
    const successURI = `${env.BASE_URL}/auth/google/success?provider=${provider}`;
    const failureURI = `${env.BASE_URL}/auth/google/failure?provider=${provider}`;

    // OAuth session creation
    await account.createOAuth2Session(
      OAuthProvider.Google,
      successURI,
      failureURI
    );
  } catch (error) {
    console.error("Login failed:", error);
    console.log("Login error: ", error.message);
  }
};
