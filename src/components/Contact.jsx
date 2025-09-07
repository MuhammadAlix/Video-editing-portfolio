import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("✅ Message sent successfully!");
        },
        (error) => {
          console.error(error.text);
          alert("❌ Failed to send message. Please try again.");
        }
      );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact" id="contact">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-subtitle">Have a project in mind? Let’s talk 👋</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="contact-btn">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;
