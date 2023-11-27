import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TaskFormSchema } from "../validation/InputValidation";
import { User } from "@styled-icons/boxicons-regular/User";
import { Attach2Outline } from "@styled-icons/evaicons-outline/Attach2Outline";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TaskFormSchema) });
  const getErrorMsg = (error) => {
    if (error.response) {
      return error.response.data.message;
    }
  };
  const product = async (data) => {
    // try {
    //   const response = await toast.promise(
    //     axios.post(`${import.meta.env.VITE_BASE_URL}/addProduct`, data),
    //     {
    //       loading: "create a product...",
    //       success: <b>Product created successfully</b>,
    //       error: (error) => <b>{getErrorMsg(error)}</b>,
    //     }
    //   );
    //   return response;
    // } catch (error) {
    //   console.log("Errorr ======>", error);
    // }
  };
  return (
    // <div className=" bg-zinc-200 m-auto mt-10 rounded-sm shadow-md">
    <div className=" bg-zinc-200 w-[800px] h-[800px] m-auto mt-10 rounded-sm shadow-md">
      <h1 className=" text-center p-5 text-green-700 text-2xl font-serif font-bold ">
        Create Task
      </h1>
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={(e) => {
          handleSubmit(product)(e);
        }}
      >
        <div className="relative">
          <InputField
            label="Name"
            type="text"
            placeholder="Task Name"
            className="border text-sm pl-3 border-gray-400 w-[450px] h-[45px] rounded-md outline-none mt-2 placeholder:text-slate-400 placeholder:text-center xs:w-full"
            {...register("taskName")}
            error={errors?.taskName}
          />
          <User className=" w-[30px] h-[30px] absolute top-10 left-0" />
        </div>
        <div className="flex flex-col">
          <InputField
            label="Start Date"
            type="date"
            className="border text-sm pl-3 border-gray-400 w-[250px] h-[45px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
            {...register("startDate")}
            error={errors?.startDate}
          />
        </div>
        <InputField
          label="End Date"
          type="date"
          className="border text-sm pl-3 border-gray-400 w-[250px] h-[45px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("EndDate")}
          error={errors?.EndtDate}
        />
        <InputField
          label="Assignee"
          type="text"
          placeholder="Add Assignee"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-400 xs:w-full"
          {...register("assignee")}
          error={errors?.taskName}
        />
        <InputField
          label="Projects"
          type="text"
          placeholder="Project Name"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-400 xs:w-full"
          {...register("projectName")}
          error={errors?.projectName}
        />
        <InputField
          label="Description"
          type="text"
          placeholder="Description"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("description")}
          error={errors?.description}
        />
        <div className=" flex">
          <InputField
            label="Priority"
            type="radio"
            className="border pl-3 border-gray-400 w-[80px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
            {...register("priority")}
            error={errors?.priority}
          />
          <InputField
            type="radio"
            className="border pl-3 border-gray-400 w-[80px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
            {...register("priority")}
            error={errors?.priority}
          />
          <InputField
            type="radio"
            className="border text-sm pl-3 border-gray-400 w-[80px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
            {...register("priority")}
            error={errors?.priority}
          />
        </div>
        <div>
          <Attach2Outline className=" w-[30px] h-[30px]" />
          <InputField type="file" className="" />
        </div>
        <div className="flex">
          <Button label="Cancel" type="submit" className="" />
          <Button
            label="Submit"
            type="submit"
            className="bg-blue-500 hover:text-white hover:bg-blue-700"
          />
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default TaskForm;
