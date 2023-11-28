// DashboardHome.jsx

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { MdAddToPhotos } from "react-icons/md";
import ProjectForm from "../../forms/CreateProject";
import Modal from "../../Modal/Modal";

const DashboardHome = () => {
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    fetchProjects();
  }, []);

  useEffect(() => {
    const filteredData = projects?.filter(
      (project) =>
        project.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProjects(filteredData);
  }, [searchValue, projects]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="container mt-5 w-[50vw]">
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
                placeholder="Search by name"
                className="w-full py-2 pl-10 pr-3 text-sm text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
          </form>
          <button
            className="bg-green-700 flex justify-center items-center hover:bg-green-400 transition-all duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <MdAddToPhotos size={24} /> Create Project Name
          </button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ProjectForm onClose={() => setIsModalOpen(false)}
              onProjectCreated={fetchProjects}
             />
          </Modal>
        </div>
        <div className="mt-10">
          <DataTable
            columns={columns}
            data={filteredProjects}
            selectableRows
            fixedHeader
            pagination
            responsive
            dense
          ></DataTable>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
