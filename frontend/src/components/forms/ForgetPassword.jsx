import React from "react";
import InputField from "./InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ForgetPasswordSchema } from "../validation/InputValidation";
import Button from "./Button";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

export const ForgetPassword = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(ForgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await toast.promise(
        axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/reset-password`,
          data
        ),

        {
          loading: "sending email...",
          success: <b>Email sent🚀</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );
      const { message } = response.data;
      return message;
    } catch (error) {
      console.log("hello error", error);
    }
  };

  return (
    <div className=" bg-zinc-200 w-[500px] h-[500px] m-auto mt-10 rounded-sm shadow-md">
      <h1 className=" text-center p-5 text-green-700 text-2xl font-serif font-bold">
        Forget Password
      </h1>
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
        }}
      >
        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("email")}
          error={errors?.email}
        />
        <Button label="Send" type="submit" className="" />
      </form>
      <Toaster />
    </div>
  );
};
