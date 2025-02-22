import { env } from "@/env";
import axios from "axios";

export const createChat = async (body) => {
  const res = await axios.post(`${env.BACKEND_URL}/chat/feed-docs`, body);
  return res.data;
};

export const getUserChats = async ({ queryKey }) => {
  const [, userId] = queryKey;
  const res = await axios.get(`${env.BACKEND_URL}/chat/getUserChats/${userId}`);
  return res.data;
};
