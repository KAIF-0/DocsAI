"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { ID, Query } from "appwrite";
import { account } from "@/configs/appwrite/appwrite-config";
import axios from "axios";
import Cookies from "js-cookie";
import { env } from "@/env";
import { useRouter } from "next/navigation";

export const useSubscriptionStore = create(
  persist(
    immer((set) => ({
      ispX01: false,
      type: "free",
      details: null,

      hydrated: false,

      addSubscription: async (data) => {
        try {
          const response = await axios.post(
            `${env.BACKEND_URL}/subscription/saveDetails`,
            data
          );

          if (!response) {
            return {
              success: false,
              message: "Failed to add the subscription",
            };
          }

          const { subscriptionDetails } = response?.data;

          console.log("Details:", subscriptionDetails);

          //for middleware
          Cookies.set("subToken", subscriptionDetails.id, {
            secure: true,
            expires: 30,
          });

          set({
            ispX01: true,
            type: subscriptionDetails.subscriptionType,
            details: subscriptionDetails,
          });

          console.log("Subscription added successfully!");

          return {
            message: "Subscription added successfully!",
            success: true,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            message: "An error occurred while adding the subscription",
          };
        }
      },

      getSubscriptionDetails: async ({ queryKey }) => {
        const [, userId] = queryKey;
        console.log("Fetching subscription details...");

        const response = await axios.get(
          `${env.BACKEND_URL}/subscription/getDetails/${userId}`
        );
        return response.data;
      },

      createOrder: async (body) => {
        const { data } = await axios.post(
          `${env.BACKEND_URL}/subscription/createOrder`,
          body
        );
        return data;
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
