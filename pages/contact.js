import React from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/form/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div>
        <h2>Contact Form</h2>
        <ContactForm />
      </div>
    </Layout>
  );
};

export default Contact;
