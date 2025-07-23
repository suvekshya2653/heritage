import React, { useState, useEffect, useRef } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".slide-up");
    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(""), 5000);
    }, 2000);
  };

  const contactInfo = {
    address: {
      street: "123 Heritage Lane",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    phone: "+44 20 7123 4567",
    email: "hello@heritagejewelry.co.uk",
    whatsapp: "+44 7123 456789",
    hours: {
      weekdays: "Monday - Friday: 10:00 AM - 7:00 PM",
      saturday: "Saturday: 10:00 AM - 6:00 PM",
      sunday: "Sunday: 12:00 PM - 5:00 PM",
    },
  };

  const inquiryTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "custom", label: "Custom Design" },
    { value: "repair", label: "Jewelry Repair" },
    { value: "valuation", label: "Jewelry Valuation" },
    { value: "wedding", label: "Wedding Collection" },
    { value: "appointment", label: "Private Appointment" },
  ];

  return (
    <>
      <style jsx>{`
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(159, 126, 84, 0.15);
          box-shadow: 0 8px 32px rgba(159, 126, 84, 0.1);
        }

        .contact-card {
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(159, 126, 84, 0.15);
        }

        .form-input {
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #9f7e54;
          box-shadow: 0 0 0 3px rgba(159, 126, 84, 0.1);
        }

        .submit-btn {
          transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(159, 126, 84, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .map-container {
          filter: grayscale(20%);
          transition: filter 0.3s ease;
        }

        .map-container:hover {
          filter: grayscale(0%);
        }

        .success-message {
          background: linear-gradient(45deg, #10b981, #059669);
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="font-serif bg-white text-gray-900 min-h-screen">
        {/* Hero Section */}
        <div className="py-16" style={{ backgroundColor: "#f8f6f3" }}>
          <div className="max-w-4xl mx-auto px-4 text-center slide-up">
            <h1
              className="text-5xl font-light mb-6"
              style={{ color: "#9f7e54" }}
            >
              Get in Touch
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              We'd love to hear from you. Let's create something beautiful
              together.
            </p>
            <p className="text-gray-600">
              Whether you're looking for a custom piece, need expert advice, or
              want to learn more about our heritage collection, our team is here
              to help.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="slide-up">
              <div className="glass-effect rounded-2xl p-8">
                <div className="mb-8">
                  <h2
                    className="text-3xl font-light mb-4"
                    style={{ color: "#9f7e54" }}
                  >
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24
                    hours.
                  </p>
                </div>

                {submitStatus === "success" && (
                  <div className="success-message text-white p-4 rounded-lg mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">✅</span>
                      <div>
                        <p className="font-semibold">
                          Message sent successfully!
                        </p>
                        <p className="text-sm opacity-90">
                          We'll get back to you within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Phone and Inquiry Type */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        required
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn w-full py-4 text-white rounded-lg font-semibold text-lg"
                    style={{ backgroundColor: "#9f7e54" }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending Message...
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="slide-up space-y-8">
              {/* Main Contact Info */}
              <div className="glass-effect rounded-2xl p-8 contact-card">
                <h3
                  className="text-2xl font-light mb-6"
                  style={{ color: "#9f7e54" }}
                >
                  Visit Our Showroom
                </h3>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Address
                      </h4>
                      <p className="text-gray-600">
                        {contactInfo.address.street}
                        <br />
                        {contactInfo.address.city},{" "}
                        {contactInfo.address.postcode}
                        <br />
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Phone
                      </h4>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 hover:text-[#9f7e54] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Email
                      </h4>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 hover:text-[#9f7e54] transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <span className="text-xl">💬</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        WhatsApp
                      </h4>
                      <a
                        href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, "")}`}
                        className="text-gray-600 hover:text-[#9f7e54] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contactInfo.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="glass-effect rounded-2xl p-8 contact-card">
                <h3
                  className="text-2xl font-light mb-6"
                  style={{ color: "#9f7e54" }}
                >
                  Business Hours
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-800">
                      Monday - Friday
                    </span>
                    <span className="text-gray-600">10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-800">
                      Saturday
                    </span>
                    <span className="text-gray-600">10:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-800">Sunday</span>
                    <span className="text-gray-600">12:00 PM - 5:00 PM</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">💡 Pro Tip:</span> For
                    private consultations and custom design appointments, we
                    recommend booking in advance to ensure dedicated time with
                    our experts.
                  </p>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="glass-effect rounded-2xl p-8 contact-card">
                <h3
                  className="text-2xl font-light mb-6"
                  style={{ color: "#9f7e54" }}
                >
                  Quick Contact
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-semibold"
                  >
                    <span>📞</span>
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/\s+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold"
                  >
                    <span>💬</span>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-16 slide-up">
            <div className="text-center mb-8">
              <h2
                className="text-3xl font-light mb-4"
                style={{ color: "#9f7e54" }}
              >
                Find Us
              </h2>
              <p className="text-gray-600">
                Located in the heart of London, easily accessible by public
                transport
              </p>
            </div>

            <div className="glass-effect rounded-2xl p-4">
              <div className="map-container w-full h-96 bg-gray-100 rounded-xl flex items-center justify-center">
                {/* Replace this with actual Google Maps embed */}
                <div className="text-center">
                  <span className="text-6xl mb-4 block">🗺️</span>
                  <p className="text-gray-600 mb-2">
                    Interactive Google Maps will be embedded here
                  </p>
                  <p className="text-sm text-gray-500">
                    123 Heritage Lane, London SW1A 1AA
                  </p>
                </div>
                {/*
                Actual Google Maps embed code would look like:
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                */}
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>🚇</span>
                  <span>2 min walk from Bond Street Station</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚗</span>
                  <span>Public parking available nearby</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>♿</span>
                  <span>Wheelchair accessible entrance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="py-16 mt-16" style={{ backgroundColor: "#f8f6f3" }}>
          <div className="max-w-4xl mx-auto px-4 text-center slide-up">
            <h2
              className="text-3xl font-light mb-4"
              style={{ color: "#9f7e54" }}
            >
              Stay Connected
            </h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals,
              and jewelry care tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ "--tw-ring-color": "#9f7e54" }}
              />
              <button
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                style={{ backgroundColor: "#9f7e54" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer
          className="py-12 text-white"
          style={{ backgroundColor: "#231f20" }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mandala-placeholder mx-auto mb-6 opacity-60"></div>
            <h3
              className="text-2xl mb-2 font-light"
              style={{ color: "#9f7e54" }}
            >
              HERITAGE
            </h3>
            <p className="text-lg mb-4 opacity-80">by Standard Gold Exchange</p>
            <p className="opacity-60">
              Honoring Nepali Heritage • Coming Soon to the UK
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ContactUsPage;
