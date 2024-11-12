"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  // Formik setup for handling form state and validation
  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().max(255).required("First name is required"),
      lastName: Yup.string().max(255).required("Last name is required"),
      email: Yup.string().email().max(255).required("Email is required"),
      password: Yup.string().min(6).max(255).required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      setSubmitted(true);
      try {
        // API call to register the user done here
        console.log("User Registered:", values);
        toast.success("Registration successful!");
        router.push("/login"); // Redirect to login page
      } catch (error: any) {
        console.log(error);
        toast.error("An unexpected error occurred.");
      }
      setSubmitted(false);
    },
  });

  const { touched, errors, handleSubmit, handleChange, handleBlur, values } =
    form;

  return (
    <div className="w-full max-w-lg mx-auto mt-12 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-center text-primary mb-10">
        Sign Up
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* First Name and Last Name Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-lg font-bold text-neutral-600"
            >
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            {touched.firstName && errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-lg font-bold text-neutral-600"
            >
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            {touched.lastName && errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <section className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-bold text-neutral-600"
          >
            Email Address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {touched.email && errors.email && (
            <p className="text-red-600 text-sm">{errors.email}</p>
          )}
        </section>

        {/* Password Field */}
        <section className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-bold text-neutral-600"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {touched.password && errors.password && (
            <p className="text-red-600 text-sm">{errors.password}</p>
          )}
        </section>

        {/* Confirm Password Field */}
        <section className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-lg font-bold text-neutral-600"
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
          )}
        </section>

        {/* Submit Button */}
        <section className="flex flex-col items-center">
          <button
            type="submit"
            disabled={submitted}
            className="flex items-center gap-2 text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center"
          >
            <div
              className={`${
                !submitted && "hidden"
              } animate-spin inline-block w-6 h-6 border-[4px] border-current border-t-transparent text-white rounded-full`}
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
            Sign Up
          </button>
        </section>
      </form>
    </div>
  );
};

export default SignUp;
