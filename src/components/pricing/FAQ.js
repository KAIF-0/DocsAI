import React, { memo } from "react";

const FAQ = ({ faqs }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-800/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            {faq.question}
          </h3>
          <p className="text-gray-400">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default memo(FAQ);
