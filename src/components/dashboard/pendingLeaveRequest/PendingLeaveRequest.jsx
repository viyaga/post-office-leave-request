"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './pendingLeaveRequest.scss'
import { getData } from "@/services";
import { leaveDataColums } from '@/data'
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddLeaveData from "./addLeaveData/AddLeaveData";

const PendingLeaveRequest = () => {
  const [rows, setRows] = useState(null)
  const [open, setOpen] = useState(false)

  const fetchData = async (type, category) => {
    const res = await getData(type, category)

    if (res.error) return toast.error("An Error Occured While Fetching Data")
    if (res.data) {
      const idAddedData = res.data.map((item, index) => ({ id: index + 1, ...item }))
      setRows(idAddedData)
    }
  }

  useEffect(() => {
    fetchData('leaves', 'pending')
  }, [])

  return (
    <div className="leave-requests">
      <div className="info">
        <h2>Pending</h2>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      {(rows && rows.length > 0)
        ? < DataTableWithActions columns={leaveDataColums} rows={rows} />
        : rows
          ? <p>No Data Found</p>
          : <p>Loading...</p>
      }
      {open && <AddLeaveData setOpen={setOpen} />}
    </div>
  )
}

export default PendingLeaveRequest