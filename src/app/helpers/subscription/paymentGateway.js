import { env } from "@/env";
import addSubscription from "./addSubscription";

const paymentHelper = (res) => {
  var options = {
    key: env.RAZORPAY_ID_KEY,
    amount: parseInt(res.amount) * 100,
    currency: "USD",
    name: res.product_name,
    description: res.description,
    image: "https://dummyimage.com/600x400/000/fff",
    order_id: res.order_id,
    handler: async function (response) {
      const isSaved = await addSubscription(res);
      console.log(isSaved)
      if (isSaved.success === true) {
        console.log("Subscription saved");
        alert("Payment Succeeded");
      } else {
        console.log("Subscription not saved");
      }
    },
    prefill: {
      contact: res.contact,
      name: res.name,
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
    alert("Payment Failed");
  });
  razorpayObject.open();
};

export default paymentHelper;
