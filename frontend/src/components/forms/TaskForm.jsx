import React, { useEffect, useState } from "react";
import Select from "react-select";
import InputField from "./InputField";
import Button from "./Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { TaskSchema } from "../validation/InputValidation";
import { Attach2Outline } from "@styled-icons/evaicons-outline/Attach2Outline";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const TaskForm = ({ onclose, onProjectCreated }) => {
  const [selectedPriority, setSelectedPriority] = useState("low");
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProjectAssignees, setSelectedProjectAssignees] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: 400,
    }),
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          setSelectedImage(imageData);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log("Error reading file:", error);
      }
    }
  };

  const createTask = async (data) => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("profilePic", selectedImage);
    }
    formData.append("priority", selectedPriority);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);

    selectedAssignees.forEach((assignee) => {
      formData.append("assignees", assignee);
    });

    selectedProjectAssignees.forEach((projectAssignee) => {
      formData.append("projectAssignees", projectAssignee);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/task/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task created successfully");
      console.log(response);
      return response;
    } catch (error) {
      toast.error(getErrorMsg(error));
      console.log("Error creating task:", error);
    }
  };

  return (
    <div className="bg-zinc-200 w-[500px] h-[800px] m-auto mt-10 rounded-sm shadow-md">
      <h1 className="text-center p-5 text-green-700 text-2xl font-serif font-bold">
        Create Task
      </h1>
      <form
        className="flex items-center flex-col"
        onSubmit={handleSubmit(createTask)}
        encType="multipart/form-data"
      >
        <label className="text-sm text-left text-gray-500 mb-1">Name</label>
        <InputField
          type="text"
          placeholder="Enter Task Name"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("name")}
          error={errors?.name}
        />
        <label className="text-sm text-gray-500 mb-1">Description</label>
        <InputField
          type="text"
          placeholder="Enter Task Description"
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2 placeholder:text-slate-300 xs:w-full"
          {...register("description")}
          error={errors?.description}
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
          {...register("endDate")}
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
            setSelectedProjectAssignees(selectedValues);
          }}
          value={selectedProjectAssignees.map((value) => ({
            value,
            label: value,
          }))}
          styles={customStyles}
        />
        <label className="text-sm text-gray-500 mb-1">Priority</label>
        <select
          className="border text-sm pl-3 border-gray-400 w-[400px] h-[40px] rounded-sm outline-none mt-2"
          onChange={(e) => setSelectedPriority(e.target.value)}
          value={selectedPriority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              className="relative w-[60px] h-[60px] mb-4 ml-auto border-[1px] border-[#5157E0] rounded-full"
              {...getRootProps()}
            >
              <img
                src={selectedImage || watch("profilePic")}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
              <input {...getInputProps()} />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-1 bg-white rounded-full cursor-pointer"
              >
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.6665 1.33333C8.6665 0.597333 9.21717 0 9.89717 0H18.1025C18.7825 0 19.3332 0.597333 19.3332 1.33333C19.3332 2.06933 18.7825 2.66667 18.1025 2.66667H9.89717C9.21717 2.66667 8.6665 2.06933 8.6665 1.33333ZM11.0372 24H16.9625C21.1238 24 23.2052 24 24.6998 23.0373C25.3429 22.6239 25.8983 22.0879 26.3345 21.46C27.3332 20.02 27.3332 18.0133 27.3332 14C27.3332 9.98667 27.3332 7.98133 26.3332 6.54C25.8975 5.91215 25.3425 5.37619 24.6998 4.96267C23.2052 4 21.1238 4 16.9625 4H11.0372C6.87584 4 4.7945 4 3.29984 4.96267C2.6572 5.37622 2.10222 5.91218 1.6665 6.54C0.666504 7.98 0.666504 9.98667 0.666504 13.9973V14C0.666504 18.0133 0.666504 20.0187 1.66517 21.46C2.09717 22.084 2.65184 22.62 3.29984 23.0373C4.7945 24 6.87584 24 11.0372 24ZM8.44384 14C8.44384 11.04 10.9318 8.64267 13.9998 8.64267C17.0678 8.64267 19.5558 11.0413 19.5558 14C19.5558 16.9587 17.0665 19.3573 13.9998 19.3573C10.9318 19.3573 8.44384 16.9573 8.44384 14ZM10.6665 14C10.6665 12.224 12.1598 10.7867 13.9998 10.7867C15.8398 10.7867 17.3332 12.2253 17.3332 14C17.3332 15.7747 15.8398 17.2133 13.9998 17.2133C12.1598 17.2133 10.6665 15.7747 10.6665 14ZM22.1478 8.64267C21.5345 8.64267 21.0372 9.12267 21.0372 9.71467C21.0372 10.3053 21.5345 10.7853 22.1478 10.7853H22.8892C23.5025 10.7853 23.9998 10.3053 23.9998 9.71467C23.9998 9.12267 23.5025 8.64267 22.8892 8.64267H22.1478Z"
                    fill="#242760"
                    fillOpacity="0.81"
                  />
                </svg>
              </label>
            </div>
          )}
        </Dropzone>
        <div className="flex">
          <Button label="Submit" type="submit" className="" />
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default TaskForm;
