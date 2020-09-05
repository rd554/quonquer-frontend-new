import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = () => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
  });

  return (
    <React.Fragment>
      <p>show contact form</p>
    </React.Fragment>
  );
};

export default ContactForm;
