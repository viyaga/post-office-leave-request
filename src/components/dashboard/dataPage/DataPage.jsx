"use client"

import { useEffect, useState } from "react";
import './data-page.scss'
import DataTable from "../shared/dataTable/DataTable";

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

<<<<<<< HEAD
  const fetchData = async (type, category) => {
    // currently type = leave or employee
    const API_URL = `${process.env.NEXT_PUBLIC_SERVER_ONE}/${type}/${category}`
    const res = await axios.get(API_URL)
    const data = await res.json()
    setRows(data[type])
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
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  )
======
    return (
        <div className="leave-requests">
            <div className="info">
                <h1>Leave Requests</h1>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            <DataTable slug="products" columns={columns} rows={[]} />
            {/*{open && <Add slug="product" columns={columns} setOpen={setOpen} />}*/}
        </div>
    )
>>>>>>> d2e5a7e52cb4c9913166ddc1cc4eddc2925af626
}

export default DataPage
