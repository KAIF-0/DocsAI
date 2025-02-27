import React from "react";
import { Brain, Users, Shield, Zap } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Kaif",
      role: "CEO & Founder",
      image:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    {
      name: "Neyo",
      role: "CTO",
      image:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    {
      name: "Neyo",
      role: "Head of AI",
      image:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    {
      name: "Kaif",
      role: "Lead Developer",
      image:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Making Documentation{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Intelligent
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We&apos;re on a mission to revolutionize how developers interact
            with documentation, making it more accessible, intelligent, and
            efficient than ever before.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: <Brain className="h-8 w-8 text-blue-400" />,
              title: "Innovation First",
              description:
                "Pushing the boundaries of AI technology to create smarter documentation solutions.",
            },
            {
              icon: <Users className="h-8 w-8 text-purple-400" />,
              title: "User Focused",
              description:
                "Every feature we build starts with understanding developer needs.",
            },
            {
              icon: <Shield className="h-8 w-8 text-green-400" />,
              title: "Security Driven",
              description:
                "Your documentation and data security is our top priority.",
            },
            {
              icon: <Zap className="h-8 w-8 text-yellow-400" />,
              title: "Lightning Fast",
              description:
                "Performance is not an afterthought, it's a requirement.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 transform transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-8">
            <p className="text-gray-300 mb-6">
              DocsAI was born from a simple observation: developers spend too
              much time searching through documentation. We believed there had
              to be a better way. Starting in 2024, we set out to build an
              AI-powered solution that would make documentation more accessible
              and interactive.
            </p>
            <p className="text-gray-300">
              Today, we&apos;re proud to help thousands of developers work more
              efficiently by providing intelligent access to documentation. But
              this is just the beginning of our journey to revolutionize how
              developers interact with documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
