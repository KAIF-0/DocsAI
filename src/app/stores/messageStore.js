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

export const useMessageStore = create(
  persist(
    immer((set, get) => ({
      msgCount: 0,
      siteCount: 0,

      hydrated: false,

      increaseMsgCount: () =>
        set((state) => ({ msgCount: state.msgCount + 1 })),

      increaseSiteCount: () =>
        set((state) => ({ siteCount: state.siteCount + 1 })),

      refreshStore: () => {
        console.log("Cleaning Message Store!");
        set({
          msgCount: 0,
          siteCount: 0,
        });


        //saving lastRefresh time to localStorage
        localStorage.setItem("_lastRefresh", new Date().toISOString());
      },

      checkAndRefresh: () => {
        const lastRefresh = localStorage.getItem("_lastRefresh");
        const now = new Date();
        const lastRefreshDate = lastRefresh ? new Date(lastRefresh) : null;

        console.log(lastRefreshDate);

        if (
          !lastRefreshDate ||
          lastRefreshDate.toDateString() !== now.toDateString()
        ) {
          console.log("Refreshing message store!");
          get().refreshStore();
        }
      },

      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "_user/msg",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
