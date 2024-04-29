"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './allApprovedLeaves.scss'
import { getPendngLeaveData } from "@/services";
import { leaveDataColums } from '@/data'
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddLeaveData from "./addLeaveData/AddLeaveData";
import { useDispatch, useSelector } from "react-redux";
import { setPendingLeaves } from "@/redux/slices/commonSlice";
import DeleteLeaveData from "./deleteLeaveData/DeleteLeaveData";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";
import { MdFilterList } from "react-icons/md";

const AllApprovedLeaves = ({ substitutes, employees, holidays }) => {
  const { pendingLeave } = useSelector(state => state.common)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [deleteData, setDeleteData] = useState(null)
  const [editData, setEditData] = useState(null)
  const dispatch = useDispatch()

  const fetchData = async () => {
    const res = await getPendngLeaveData()

    if (res.error) toast.error("An Error Occured While Fetching Data")
    if (res.leaves) {
      console.log({ leaves: res.leaves });
      dispatch(setPendingLeaves(res.leaves))
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="approvedLeave">
      <div className="info">
        <h2>Approved</h2>
        <div onClick={() => console.log('FILTER')}><MdFilterList size={24} /></div>
      </div>
      {(pendingLeave?.length > 0)
        ? < DataTableWithActions columns={leaveDataColums} rows={pendingLeave} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
        : (pendingLeave?.length === 0)
          ? <DashboardLoading />
          : <DashboardLoading />
      }
      {editData && <AddLeaveData substitutes={substitutes} employees={employees} holidays={holidays} editData={editData} setEditData={setEditData} />}
      {/* {isFilterOpen && <FilterByDate setIsFilterOpen={setIsFilterOpen} substitutes={substitutes} employees={employees} />} */}
      {deleteData && <DeleteLeaveData deleteData={deleteData} setDeleteData={setDeleteData} />}
    </div>
  )
}

export default AllApprovedLeaves