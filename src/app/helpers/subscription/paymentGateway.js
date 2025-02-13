import { env } from "@/env";
import addSubscription from "./addSubscription";

const paymentHelper = (res, setSubscription) => {
  var options = {
    key: env.RAZORPAY_ID_KEY,
    amount: parseInt(res.amount) * 100,
    currency: "USD",
    name: res.product_name,
    description: res.description,
    image: "https://dummyimage.com/600x400/000/fff",
    orderId: res.orderId,
    handler: async function () {
      await addSubscription(res)
        .then(async (response) => {
          // console.log(response.subscription);
          await setSubscription(response?.subscriptionDetails);
          window.location.href = `/plan/details?id=${res.orderId}&success=true`;
          // alert("Payment Succeeded");
        })
        .catch((error) => {
          console.log("Subscription not saved");
          addSubscription(res); //retry to save subscription details
        });
    },
    prefill: {
      contact: res.phone,
      name: res.username,
      email: res.email,
    },
    notes: {
      description: res.description,
    },
    theme: {
      color: "#2300a3",
    },
  };
  var razorpayObject = new window.Razorpay(options);
  razorpayObject.on("payment.failed", function (response) {
    // console.log(response)
    window.location.href = `/plan/failure?message=${response.error.description}`;
    // alert("Payment Failed");
  });
  razorpayObject.open();
};

export default paymentHelper;
