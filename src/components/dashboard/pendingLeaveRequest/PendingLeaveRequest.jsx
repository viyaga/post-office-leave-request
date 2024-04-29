"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './pendingLeaveRequest.scss'
import { getPendngLeaveData } from "@/services";
import { leaveDataColums } from '@/data'
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddLeaveData from "./addLeaveData/AddLeaveData";
import { useDispatch, useSelector } from "react-redux";
import { setPendingLeaves } from "@/redux/slices/commonSlice";
import DeleteLeaveData from "./deleteLeaveData/DeleteLeaveData";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";

const PendingLeaveRequest = ({ substitutes, employees, holidays, pendingLeaveData }) => {
  const { pendingLeave } = useSelector(state => state.common)
  const [deleteData, setDeleteData] = useState(null)
  const [editData, setEditData] = useState(null)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPendingLeaves(pendingLeaveData))
  }, [dispatch, pendingLeaveData])

  return (
    <div className="pendingLeave">
      <div className="info">
        <h2>Pending</h2>
        <button onClick={() => setOpen(true)}>Add New</button>
      </div>
      {(pendingLeave?.length > 0)
        ? < DataTableWithActions columns={leaveDataColums} rows={pendingLeave} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
        : (pendingLeave?.length === 0)
          ? <p>No Data Found</p>
          : <DashboardLoading />
      }
      {open && <AddLeaveData substitutes={substitutes} employees={employees} holidays={holidays} editData={editData} setEditData={setEditData} setOpen={setOpen} />}
      {deleteData && <DeleteLeaveData deleteData={deleteData} setDeleteData={setDeleteData} />}
    </div>
  )
}

export default PendingLeaveRequest