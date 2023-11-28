import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ResetSchema } from "../validation/InputValidation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ResetSchema) });

 const {token} = useParams()
 const navigate = useNavigate();
  const getErrorMsg = (error) => {
    if (error.response) {
      return error.response.data.error;
    }
  };
  const resetPassword = async (data) => {
    try {
      const response = await toast.promise(
        axios.patch(`${import.meta.env.VITE_BASE_URL}/auth/reset-password/${token}`, data),
        {
          loading: "Reseting password...",
          success: <b>Reseting Password successfully</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );
      navigate("/login")
      return response;
    } catch (error) {
        console.log("error >>", error);
        
    }
  };
  return (
    <div className=" bg-zinc-200 w-[500px] h-[500px] m-auto mt-10 rounded-sm shadow-md">
      <h1 className=" text-center p-5 text-green-700 text-2xl font-serif font-bold">
        Reset Password 
      </h1>
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={(e) => {
          handleSubmit(resetPassword)(e);
        }}
      >
        <InputField
          label="Password"
          type="password"
          placeholder="Enter password"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("password")}
          error={errors?.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("password2")}
          error={errors?.password2}
        />
        <Button label="Reset" type="submit" className="" />
      </form>
      <Toaster />
    </div>
  );
};

export default ResetPasswordForm;
