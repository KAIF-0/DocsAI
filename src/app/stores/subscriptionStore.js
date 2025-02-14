"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ID, Query } from "appwrite";
import { account } from "@/configs/appwrite/appwrite-config";
import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/env";

export const useSubscriptionStore = create(
  persist(
    immer((set) => ({
      ispX01: false,
      type: "free",
      details: null,

      hydrated: false,
      setSubscription: async (details) => {
        try {
          console.log("DETAILS: " + details);

          if (!details) {
            return {
              success: false,
              message: "Details Empty!",
            };
          }

          //for middleware
          Cookies.set("subToken", details.id, {
            secure: true,
            expires: 30,
          });

          set({
            ispX01: true,
            type: details.subscriptionType,
            details: details,
          });

          return {
            message: "Details set successfully!",
            success: true,
          };
        } catch (error) {
          console.log(error);
          return {
            message: "Failed to set subscription details!",
            success: false,
          };
        }
      },

      getSubscriptionDetails: async ({ queryKey }) => {
        const [, userId] = queryKey;
        console.log('Fetching subscription details...');

        const response = await axios.get(
          `${env.BACKEND_URL}/subscription/getDetails/${userId}`
        );
        return response.data;
      },

      cleanStore: async () => {
        try {
          console.log("Cleaning Subscription Store!");

          Cookies.remove("subToken");
          set({
            ispX01: false,
            type: "free",
            details: null,
          });
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
      name: "_user/sub",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
