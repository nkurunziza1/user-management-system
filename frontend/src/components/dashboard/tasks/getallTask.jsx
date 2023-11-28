import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { RiEdit2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";
import axios from "axios";
import TaskForm from "../../forms/TaskForm";
import Modal from "../../Modal/Modal";


const GetAllTask = () => {
  const token = localStorage.getItem("token");
  const [Tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(Tasks);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/task`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTasks();
  }, []);

  // update tasks
  const handleEdit = (taskId) => {
    
    console.log(`Edit task with ID ${taskId}`);
  };

  //   delete tasks

  const handleDelete = (taskId) => {
    console.log(`Delete task with ID ${taskId}`);
  };

  useEffect(() => {
    const filteredData = Tasks?.filter(
      (task) =>
        task.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchValue.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTasks(filteredData);
  }, [searchValue, Tasks]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Assignee",
      selector: (row) => row.assignee,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.project,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="text-green-700 hover:text-green-400"
            onClick={() => handleEdit(row._id)}
          >
            <RiEdit2Fill size={24} />
            
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => handleDelete(row._id)}
          >
            <MdOutlineDeleteOutline size={24} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container mt-5 w-[100%]">
      <div className="text-end mb-3 flex flex-row justify-between items-center">
        <form className="max-w-sm px-4 w-full">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name assignee name or priority"
              className="w-full py-2 pl-10 pr-3 text-sm text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
        <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-green-700 flex justify-center items-center hover:bg-green-400 transition-all duration-300 ease-in-out text-white font-bold py-2 px-4 rounded">
          <MdAddToPhotos size={24} /> Create Task
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <TaskForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
      <div className="mt-10">
      <h1>Tasks</h1>
        <DataTable
          columns={columns}
          data={filteredTasks}
          selectableRows
          fixedHeader
          pagination
          noHeader
          dense
          responsive
        ></DataTable>
      </div>
    </div>
  );
};

export default GetAllTask;
