import { env } from "@/env";
import axios from "axios";

export const createOrder = async (body) => {
  const { data } = await axios.post(`${env.BACKEND_URL}/subscription/createOrder`, body);
  return data;
};
