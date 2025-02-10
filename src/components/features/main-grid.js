import React from "react";

const FeaturesGrid = ({ features }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8 transform transition-all duration-300 hover:scale-105"
        >
          <div className="mb-6">{feature.icon}</div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            {feature.title}
          </h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesGrid;
