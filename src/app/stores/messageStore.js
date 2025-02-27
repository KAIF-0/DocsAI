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
    immer((set) => ({
      msgCount: 0,
      siteCount: 0,

      hydrated: false,

      increaseMsgCount: () =>
        set((state) => ({ msgCount: state.msgCount + 1 })),
      
      increaseSiteCount: () =>
        set((state) => ({ siteCount: state.siteCount + 1 })),

      refreshStore: async () => {
        console.log("Cleaning Message Store!");
        set({
          msgCount: 0,
          siteCount: 0,
        });
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
