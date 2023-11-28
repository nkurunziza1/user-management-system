import React, { useEffect, useState } from "react";
import Select from "react-select";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { User } from "@styled-icons/boxicons-regular/User";
import { TaskSchema } from "../validation/InputValidation";
import { Attach2Outline } from "@styled-icons/evaicons-outline/Attach2Outline";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const TaskForm = ({ onclose, onProjectCreated }) => {
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TaskSchema) });
  const getErrorMsg = (error) => {
    if (error.response) {
      return error.response.data.message;
    }
  };
  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/project`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/profiles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    fetchProjects();
  }, []);

  const createTask = async (data) => {
    const formData = new FormData();

    selectedImages.forEach((image, index) => {
      formData.append(`perRoomImages`, image);
    });

    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    selectedAmenities.forEach((amenity) => {
      formData.append("amenities", amenity);
    });

    try {
      const response = await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/task/create`, data),
        {
          loading: "create a product...",
          success: <b>Product created successfully</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );
      return response;
    } catch (error) {
      console.log("Errorr ======>", error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 400,
    }),
  };

  return (
    <div className=" bg-zinc-200 w-[500px] h-[800px] m-auto mt-10 rounded-sm shadow-md">
      <h1 className=" text-center p-5 text-green-700 text-2xl font-serif font-bold ">
        Create Task
      </h1>
      <form
        className="flex  items-center flex-col"
        onSubmit={(e) => {
          handleSubmit(createTask)(e);
        }}
      >
        <label className="text-sm  text-left text-gray-500 mb-1">Name</label>
        <InputField
          type="text"
          placeholder="Enter Task Name"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("startDate")}
          error={errors?.startDate}
        />
        <label className="text-sm text-gray-500 mb-1">Description</label>
        <InputField
          type="text"
          placeholder="Enter Task Description"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("startDate")}
          error={errors?.startDate}
        />
        <label className="text-sm text-gray-500 mb-1">Starting Date</label>
        <InputField
          type="date"
          placeholder="Enter Starting Date"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("startDate")}
          error={errors?.startDate}
        />
        <label className="text-sm text-gray-500 mb-1">Ending Date</label>
        
        <InputField
          type="date"
          placeholder="Enter Expiry Date"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("endingDate")}
          error={errors?.endDate}
        />

        <label className="text-sm text-gray-500 mb-1">Assignee</label>
        <Select
          options={users.map((user) => ({
            value: user.fullname,
            label: user.fullname,
          }))}
          isMulti
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );
            setSelectedAssignees(selectedValues);
          }}
          value={selectedAssignees.map((value) => ({ value, label: value }))}
          styles={customStyles}
        />
        <label className="text-sm text-gray-500 mb-1">Project</label>
        <Select
          options={projects.map((project) => ({
            value: project.name,
            label: project.name,
          }))}
          isMulti
          onChange={(selectedOptions) => {
            const selectedValues = selectedOptions.map(
              (option) => option.value
            );
            setSelectedAssignees(selectedValues);
          }}
          value={selectedAssignees.map((value) => ({ value, label: value }))}
          styles={customStyles}
        />

        <div className="flex">
          <Button label="Submit" type="submit" className="" />
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default TaskForm;
