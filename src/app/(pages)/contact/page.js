import { Contact } from "@/components/landing-page/Contact";
import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Contact title={"Contact"} />
      <p className="text-center text-sm text-gray-500">
        Need assistance? Contact our support at{" "}
        <a
          href="mailto:support@docsai.com"
          className="text-blue-400 hover:text-blue-300"
        >
          support@docsai.com
        </a>
      </p>
    </div>
  );
};

export default ContactPage;
