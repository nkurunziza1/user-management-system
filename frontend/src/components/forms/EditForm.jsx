import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TaskFormSchema } from "../validation/InputValidation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EditProductForm = ({ row, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(PostFormSchema) });

  const getErrorMsg = (error) => {
    if (error.response) {
      return error.response.data.message;
    }
  };

  const handleEditProduct = async (data) => {
    try {
      const response = await toast.promise(
        axios.put(
          `${import.meta.env.VITE_BASE_URL}/updateProduct/${row._id}`,
          data
        ),
        {
          loading: "updating a product...",
          success: <b>Product updated successfully</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );
      onClose();
      return response;
    } catch (error) {
      console.log("Errorr ======>", error);
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-col"
      onSubmit={handleSubmit(handleEditProduct)}
    >
      <InputField
        label="Product Name"
        type="text"
        placeholder="Product Name"
        className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
        {...register("prodName", { required: true })}
        defaultValue={row.prodName}
        error={errors?.prodName}
      />
      <InputField
        label="Description"
        type="text"
        placeholder="Description"
        className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
        {...register("description", { required: true })}
        defaultValue={row.description}
        error={errors?.description}
      />
      <Button label="Update" type="submit" className="" />
    </form>
  );
};
export default EditProductForm;
