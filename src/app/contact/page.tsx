"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simulate sending form data
    setTimeout(() => {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section>
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      {success && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-green-900 bg-opacity-70 rounded-lg shadow-md text-white">
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-8 text-gray-900"
      >
        <div>
          <label
            htmlFor="name"
            className="block font-semibold mb-2 text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-600 mt-1 text-sm">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-semibold mb-2 text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-600 mt-1 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-semibold mb-2 text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Write your message here..."
          />
          {errors.message && (
            <p className="text-red-600 mt-1 text-sm">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
