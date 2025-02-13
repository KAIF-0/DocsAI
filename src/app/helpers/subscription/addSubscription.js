import { env } from "@/env";
import axios from "axios";

//adding subscription to database
const addSubscription = async (data) => {
  try {
    const response = await axios.post(
      `${env.BACKEND_URL}/subscription/saveDetails`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return {
      success: false,
      message: "An error occurred while adding the subscription",
    };
  }
};

export default addSubscription;
