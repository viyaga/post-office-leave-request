"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './pendingLeaveRequest.scss'
import { addIdToDataGridRows, getData } from "@/services";
import { leaveDataColums } from '@/data'
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddLeaveData from "./addLeaveData/AddLeaveData";
import { useDispatch, useSelector } from "react-redux";
import { setPendingLeave } from "@/redux/slices/commonSlice";
import DeleteLeaveData from "./deleteLeaveData/DeleteLeaveData";

const PendingLeaveRequest = () => {
  const { pendingLeave } = useSelector(state => state.common)
  const [open, setOpen] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const dispatch = useDispatch()

  const fetchData = async (type, category) => {
    const res = await getData(type, category)

    if (res.error) return toast.error("An Error Occured While Fetching Data")
    if (res.data) {
      const idAddedData = addIdToDataGridRows(res.data)
      dispatch(setPendingLeave(idAddedData))
    }
  }

  useEffect(() => {
    fetchData('leaves', 'pending')
  }, [])

  return (
    <div className="pendingLeave">
      <div className="info">
        <h2>Pending</h2>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      {(pendingLeave && pendingLeave.length > 0)
        ? < DataTableWithActions columns={leaveDataColums} rows={pendingLeave} setDeleteData={setDeleteData} />
        : pendingLeave
          ? <p>No Data Found</p>
          : <p>Loading...</p>
      }
      {open && <AddLeaveData setOpen={setOpen} />}
      {deleteData && <DeleteLeaveData deleteData={deleteData} setDeleteData={setDeleteData} />}
    </div>
  )
}

export default PendingLeaveRequest