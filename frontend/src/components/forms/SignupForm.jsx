import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signupSchema } from "../validation/InputValidation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });
  const navigate = useNavigate();
  const getErrorMsg = (error) => {
    if (error.response) {
      return error.response.data.message;
    }
  };
  const Signup = async (data) => {
    try {
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, data),
        {
          loading: "Create a user...",
          success: <b>User created successfully</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );
      navigate("/login");
      console.log(response);
      return response;
    } catch (error) {
      console.log("Errorr ======>", error);
    }
  };
  return (
    <div className="bg-zinc-200 w-[500px] h-[500px] m-auto mt-10 rounded-sm shadow-md">
      <h1 className=" text-center p-5 text-green-700 text-2xl font-serif font-bold">
        Signup Form
      </h1>
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={(e) => {
          handleSubmit(Signup)(e);
        }}
      >
        <InputField
          label="Full name"
          type="text"
          placeholder="fullname"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("fullname")}
          error={errors?.fullname}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("email")}
          error={errors?.email}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("password")}
          error={errors?.password}
        />
        <Button label="Button" type="submit" className="" />
      </form>
      <Toaster />
    </div>
  );
};

export default SignupForm;
