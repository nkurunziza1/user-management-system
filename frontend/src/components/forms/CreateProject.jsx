// ProjectForm.jsx

import React from "react";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProjectSchema } from "../validation/InputValidation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ProjectForm = ({ onClose, onProjectCreated }) => {
  const token = localStorage.getItem("token")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(ProjectSchema) });

  const getErrorMsg = (error) => {
    if (error.response) {
      return error.response.data.message;
    }
  };

  const createProject = async (data) => {
    try {
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/project/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          loading: "Creating project...",
          success: <b>Project created successfully</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );

      onClose();
      onProjectCreated();
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="bg-zinc-200 fixed z-50 left-0 p-10 right-0 w-fit h-fit m-auto mt-10 rounded-sm shadow-md">
      <form
        className="flex justify-center items-center flex-col"
        onSubmit={(e) => {
          handleSubmit(createProject)(e);
        }}
      >
        <InputField
          type="text"
          placeholder="Enter project name"
          className="border text-sm  pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("name")}
          error={errors?.name}
        />
        <Button label="Create Project" type="submit" className="w-fit" />
      </form>
      <Toaster />
    </div>
  );
};

export default ProjectForm;
