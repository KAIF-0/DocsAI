"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import { useSubscriptionStore } from "./stores/subscriptionStore";

const SubscriptionWrapper = () => {
  const { setSubscriptionDetails } = useSubscriptionStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    //just fetch the subscription details (if there) and will set to the store
    setSubscriptionDetails(userId);
  }, [setSubscriptionDetails, userId]);

  return null;
};

export default SubscriptionWrapper;
