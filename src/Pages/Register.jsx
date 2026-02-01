import { Input, Select, SelectItem, Button } from "@heroui/react";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAuth } from "../Services/AuthServices";
import { UserContext } from "../Context/UserContextProvider";

const Schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(5, "Min length is 5")
      .max(10, "Max length is 10"),
    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email"
      ),
    password: zod
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must include uppercase, lowercase, number, special char & min 8"
      ),
    rePassword: zod.string().nonempty("Confirm password is required"),
    dateOfBirth: zod.coerce.date().refine((dob) => {
      const age = new Date().getFullYear() - dob.getFullYear();
      return age >= 18;
    }, "You must be at least 18"),
    gender: zod.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { darkMode } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(Schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function SignUp(values) {
    setIsLoading(true);
    const response = await RegisterAuth(values);
    if (response === "success") {
      navigate("/login");
    } else {
      setErrorMessage(response);
    }
    setIsLoading(false);
  }

  const inputClass = darkMode
    ? "bg-gray-700 text-gray-100 placeholder-gray-400"
    : "bg-gray-100 text-gray-800 placeholder-gray-500";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-3xl bg-white/90 dark:bg-gray-800/80 backdrop-blur-md shadow-xl rounded-3xl p-6 sm:p-10">
        <h2 className="text-center text-3xl font-semibold text-blue-600 dark:text-blue-400">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(SignUp)}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          <Input
            variant="bordered"
            label="Name"
            type="text"
            inputClassName={inputClass}
            isInvalid={Boolean(errors?.name?.message)}
            errorMessage={errors?.name?.message}
            {...register("name")}
          />

          <Input
            variant="bordered"
            label="Email"
            type="email"
            inputClassName={inputClass}
            isInvalid={Boolean(errors?.email?.message && touchedFields.email)}
            errorMessage={errors?.email?.message}
            {...register("email")}
          />

          <Input
            variant="bordered"
            label="Password"
            type="password"
            inputClassName={inputClass}
            isInvalid={Boolean(errors?.password?.message && touchedFields.password)}
            errorMessage={errors?.password?.message}
            {...register("password")}
          />

          <Input
            variant="bordered"
            label="Confirm Password"
            type="password"
            inputClassName={inputClass}
            isInvalid={Boolean(errors?.rePassword?.message && touchedFields.rePassword)}
            errorMessage={errors?.rePassword?.message}
            {...register("rePassword")}
          />

          <Input
            variant="bordered"
            label="Date of Birth"
            type="date"
            inputClassName={inputClass}
            isInvalid={Boolean(errors?.dateOfBirth?.message && touchedFields.dateOfBirth)}
            errorMessage={errors?.dateOfBirth?.message}
            {...register("dateOfBirth")}
          />

          <Select
            variant="bordered"
            label="Gender"
            inputClassName={inputClass}
            isInvalid={Boolean(errors?.gender?.message && touchedFields.gender)}
            errorMessage={errors?.gender?.message}
            {...register("gender")}
          >
            <SelectItem key="male">Male</SelectItem>
            <SelectItem key="female">Female</SelectItem>
          </Select>

          <div className="sm:col-span-2 mt-2">
            <Button
              isLoading={isLoading}
              type="submit"
              variant="bordered"
              className="w-full py-2 text-base font-medium"
            >
              Register
            </Button>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm sm:col-span-2 text-center">
              {errorMessage}
            </p>
          )}

          <p className="text-sm sm:col-span-2 text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link className="text-blue-600 font-medium" to="/login">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
