"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Query } from "appwrite";
import { account } from "@/configs/appwrite/appwrite-config";
import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/env";

export const useAuthStore = create(
  persist(
    immer((set) => ({
      email: null,
      isLoggedIn: false,
      user: null,
      userId: null,
      username: null,

      hydrated: false,
      login: async (email = "user@example.com") => {
        try {
          console.log("EMAIL: " + email);

          if (email == "user@example.com") {
            return {
              success: false,
              message: "Invalid email!",
            };
          }
          const session = await account.createEmailToken(ID.unique(), email);

          console.log(session);

          if (!session) {
            return {
              success: false,
              message: "Failed to create session!",
            };
          }

          set({
            email: email,
            userId: session.userId,
            hydrated: true,
          });

          return {
            message: "OTP sent successfully!",
            success: true,
          };
        } catch (error) {
          console.log(error);
          return {
            message: "Failed to send OTP! Try again later...",
            success: false,
          };
        }
      },

      OAuthLogin: async () => {
        try {
          const sessionInfo = await account.getSession("current");
          console.log("SESSION:  ", sessionInfo);

          const userInfo = await account.get();
          console.log("USERINFO:  ", userInfo);

          //for middleware trigger
          Cookies.set("sessionToken", sessionInfo.$id, {
            secure: true,
            expires: 30,
          });

          set({
            email: userInfo.email,
            isLoggedIn: true,
            user: userInfo,
            userId: userInfo.$id,
            username: userInfo.name,
          });
          return {
            success: true,
            message: "Logged in successfully via Google!",
          };
        } catch (error) {
          console.log(error);
          return {
            message: "Failed to Save OAuth Credentials!",
            success: false,
          };
        }
      },

      verifyOTP: async (userId, otp, username = "user") => {
        try {
          const session = await account.createSession(userId, otp);

          if (!session) {
            return {
              success: false,
              message: "Invalid OTP!",
            };
          }

          const sessionInfo = await account.getSession("current");
          console.log("SESSION:  ", sessionInfo);

          const userInfo = await account.get();
          console.log("USERINFO:  ", userInfo);

          if (userInfo.name === "") {
            await account.updateName(username);
            console.log("User name updated!");
          }

          console.log("OTP verified successfully!");

          set({
            isLoggedIn: true,
            user: userInfo,
            username: userInfo.name || username,
          });
          return {
            success: true,
            message: "OTP verified successfully!",
          };
        } catch (error) {
          console.log("Error verifying OTP:", error);
          if (
            error?.message.includes(
              "Creation of a session is prohibited when a session is active."
            )
          ) {
            console.log("Cleaning up current session!");
            await account.deleteSession("current");
          }
          return {
            success: false,
            message: "Invalid OTP!",
          };
        }
      },

      setAuthCookies: async () => {
        try {
          const sessionInfo = await account.getSession("current");

          Cookies.set("sessionToken", sessionInfo.$id, {
            secure: true,
            expires: 30,
          });

          console.log("Cookies saved successfully!");
          return {
            success: true,
            message: "Cookies saved successfully!",
          };
        } catch (error) {
          console.log("Error saving Cookies:", error);
          return {
            success: false,
            message: "Failed to saved cookies!",
          };
        }
      },

      updateUsername: async (name) => {
        try {
          set({
            username: name,
          });
          await account.updateName(name);
          console.log("User name updated!");

          return {
            success: true,
            message: "User name updated successfully!",
          };
        } catch (error) {
          console.log("Error updating user name:", error);
          return {
            success: false,
            message: "Failed to update user name!",
          };
        }
      },

      logout: async () => {
        try {
          Cookies.remove("sessionToken");
          Cookies.remove("subToken");
          set({
            email: null,
            isLoggedIn: false,
            user: null,
            userId: null,
            username: null,
          });
          await account.deleteSession("current");

          console.log("User Logged Out Successfully!");

          return {
            success: true,
            message: "Logged out successfully!",
          };
        } catch (error) {
          console.log("Error logging out!", error);
          return {
            success: false,
            message: "Failed to log out!",
          };
        }
      },

      getSessionInfo: async () => {
        try {
          await account.getSession("current");

          await account.get();

          const sessionCookie = Cookies.get("sessionToken");
          if (!sessionCookie) {
            throw new Error("Session cookie not found!");
          }

          return {
            success: true,
          };
        } catch (error) {
          console.log("Error getting SessionInfo!", error);
          return {
            success: false,
          };
        }
      },

      cleanStore: async () => {
        try {
          Cookies.remove("sessionToken");
          Cookies.remove("subToken");
          set({
            email: null,
            isLoggedIn: false,
            user: null,
            userId: null,
            username: null,
          });

          //just for confirmation (removing session)
          await account.deleteSession("current");
          return {
            success: true,
          };
        } catch (error) {
          console.log("Error Cleaning Store!", error);
          return {
            success: false,
          };
        }
      },

      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "_user/data",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) {
            state
              ?.getSessionInfo() //checking appwrite auth session
              .then(async (sessionPresent) => {
                if (!sessionPresent?.success) {
                  console.log("Session not present! Cleaning store!");
                  await state?.cleanStore(); //cleaning store if session is not present
                } else console.log("Session present!");
              });
            state?.setHydrated();
          }
        };
      },
    }
  )
);
