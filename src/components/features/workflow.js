import React from "react";

const Workflow = ({ flow }) => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 hidden lg:block"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {flow.map((step, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 relative"
          >
            <div className="absolute -top-4 left-6 bg-blue-500 text-white text-sm font-bold py-1 px-3 rounded-full">
              {step.step}
            </div>
            <div className="mb-4 mt-2">{step.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Workflow);
