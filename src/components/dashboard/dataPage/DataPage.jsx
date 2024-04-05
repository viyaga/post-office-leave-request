"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './data-page.scss'
import DataTable from "../shared/dataTable/DataTable";
import Add from "../shared/add/Add";
import { getData } from "@/services";

const columns = [
  { field: "_id", headerName: "ID", width: 90 },
  // {
  //   field: "img",
  //   headerName: "Image",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 250,
  },
  {
    field: "designation",
    type: "string",
    headerName: "Designation",
    width: 150,
  },
  {
    field: "officeName",
    type: "string",
    headerName: "Office Name",
    width: 200,
  },
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 200,
  //   type: "string",
  // },
];

const DataPage = ({ type, category }) => {
  const [rows, setRows] = useState(null)
  const [open, setOpen] = useState(false);

  console.log({rows});
  const fetchData = async (type, category) => {
    const res = await getData(type, category)
    console.log({data: res?.data  || res.error });
    if (res.error) return toast.error("An Error Occured While Fetching Data")
    if (res.data) setRows(res.data)
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
