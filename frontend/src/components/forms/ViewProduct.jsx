import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import EditProductForm from "./EditForm";

const ViewProduct = () => {
  const [products, setProducts] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setSelectedRow(null);
    setShowEditForm(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/allProducts`
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.prodName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (row) => {
    try {
      const response = await toast.promise(
        axios.delete(
          `${import.meta.env.VITE_BASE_URL}/deleteProduct/${row._id}`
        ),
        {
          loading: "Delete a product...",
          success: <b>Product deleted successfully</b>,
          error: (error) => <b>{getErrorMsg(error)}</b>,
        }
      );
      return response;
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <DataTable
        columns={columns}
        data={products}
        selectableRows
        fixedHeader
        pagination
      ></DataTable>
      {showEditForm && (
        <EditProductForm row={selectedRow} onClose={handleCloseEditForm} />
      )}
      <Toaster />
    </div>
  );
};

export default ViewProduct;
