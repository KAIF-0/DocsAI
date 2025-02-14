"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ID, Query } from "appwrite";
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
          const sessionToken = await account.createEmailToken(
            ID.unique(),
            email
          );

          console.log(sessionToken);

          if (!sessionToken) {
            return {
              success: false,
              message: "Failed to create session!",
            };
          }

          set({
            email: email,
            userId: sessionToken.userId,
            hydrated: true,
          });

          return {
            message: "OTP sent successfully!",
            success: true,
          };
        } catch (error) {
          console.log(error);
          return {
            message: "Failed to send OTP!",
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

          //just for middleware setup
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

          Cookies.set("sessionToken", session.$id, {
            secure: true,
            expires: 30,
          });

          const sessionInfo = await account.getSession("current");
          console.log("SESSION:  ", sessionInfo);

          const userInfo = await account.get();
          console.log("USERINFO:  ", userInfo);

          if (userInfo.name === "") {
            await account.updateName(username);
            console.log("User name updated!");
          }

          set({
            isLoggedIn: true,
            user: userInfo,
            username: username,
          });
          return {
            success: true,
            message: "Logged in successfully!",
          };
        } catch (error) {
          console.log("Error verifying OTP:", error);
          return {
            success: false,
            message: "Invalid OTP!",
          };
        }
      },

      logout: async () => {
        try {
          Cookies.remove("sessionToken");

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
          const sessionInfo = await account.getSession("current");
          console.log("SESSION:  ", sessionInfo);

          const userInfo = await account.get();
          console.log("USERINFO:  ", userInfo);

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
          console.log("Cleaning Store!");

          Cookies.remove("sessionToken");
          set({
            email: null,
            isLoggedIn: false,
            user: null,
            userId: null,
            username: null,
          });

          //just for confirmation deleting session
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
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
