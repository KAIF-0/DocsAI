import { env } from "@/env";

const paymentHelper = (res) => {
  var options = {
    key: env.RAZORPAY_ID_KEY,
    amount: 500,
    currency: "INR",
    name: res.product_name,
    description: res.description,
    image: "https://dummyimage.com/600x400/000/fff",
    order_id: res.order_id,
    handler: function (response) {
      alert("Payment Succeeded");
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
