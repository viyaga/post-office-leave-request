"use client"

import { useEffect, useState } from "react";
import './data-page.scss'
import DataTable from "../shared/dataTable/DataTable";
import Add from "../shared/add/Add";
import { getData } from "@/services";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "title",
    type: "string",
    headerName: "Title",
    width: 250,
  },
  {
    field: "color",
    type: "string",
    headerName: "Color",
    width: 150,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const DataPage = ({ type, category }) => {
  const [rows, setRows] = useState(null)
  const [open, setOpen] = useState(false);

  const fetchData = async (type, category) => {
    const res = getData(type, category)
    //if(res.error) return toast
  }

  useEffect(() => {
    fetchData(type, category)
  }, [type, category])

  return (
    <div className="leave-requests">
      <div className="info">
        <h1>Leave Requests</h1>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      {(rows && rows.length > 0)
        ? < DataTable slug="products" columns={columns} rows={rows} />
        : rows
          ? <p>No Data Found</p>
          : <p>Loading...</p>
      }
      {/* {open && <Add slug="product" columns={columns} setOpen={setOpen} />} */}
    </div>
  )
}

export default DataPage
