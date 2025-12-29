import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/register", formData)
      .then(() => navigate("/login"))
      .catch(() => alert("Signup failed"));
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <p className="text-center text-sm text-slate-500">
          Create your account
        </p>
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Sign up
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              className="w-1/2 rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="w-1/2 rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 transition"
          >
            Create account
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
          <span className="text-sm text-slate-500">OR</span>
          <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Social Sign up */}
        <div className="space-y-3">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FaGoogle className="text-red-500" />
            Sign up with Google
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-lg border py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FaGithub />
            Sign up with GitHub
          </button>

          <button className="flex w-full items-center justify-center gap-3 rounded-lg border py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
            <FaFacebook className="text-blue-600" />
            Sign up with Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
