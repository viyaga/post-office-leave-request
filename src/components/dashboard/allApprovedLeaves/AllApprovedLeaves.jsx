"use client"

import { useEffect, useState } from "react";
import './allApprovedLeaves.scss'
import { approvedLeaveDataColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setLeaves } from "@/redux/slices/commonSlice";
import DeleteLeaveData from "./cancelLeaveApproval/CancelLeaveApproval";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";
import { MdFilterList } from "react-icons/md";
import DataTableWithCancel from "./dataTableWithCancel/DataTableWithCancel";
import Filter from "./filter/Filter";
import CancelLeaveApproval from "./cancelLeaveApproval/CancelLeaveApproval";

const AllApprovedLeaves = ({ substitutes, employees, leaves }) => {
  const { allLeaves, isDashboardLoading } = useSelector(state => state.common)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [cancelationData, setCancelationData] = useState(null)
  const dispatch = useDispatch()

  const calculateTotalDays = () => {
    let totalDays = 0;
    for (const leave of leaves) {
      totalDays += leave.days;
    }
    return totalDays;
  };

  const totalLeaveDays = calculateTotalDays()

  useEffect(() => {
    dispatch(setLeaves(leaves))
  }, [leaves])

  return (
    <div className="approvedLeave">
      <div className="info">
        <div className="title-and-filter">
          <h2>Approved</h2>
          <div className="btn" onClick={() => setIsFilterOpen(true)}><MdFilterList size={24} /></div>
        </div>
        <p className="leave-days">{totalLeaveDays} Days</p>
      </div>
      {isDashboardLoading
        ? <DashboardLoading />
        : (allLeaves?.length > 0)
          ? < DataTableWithCancel columns={approvedLeaveDataColums} rows={allLeaves} setCancelationData={setCancelationData} />
          : <p>No Data Found</p>
      }
      {isFilterOpen && <Filter setIsFilterOpen={setIsFilterOpen} substitutes={substitutes} employees={employees} />}
      {cancelationData && <CancelLeaveApproval cancelationData={cancelationData} setCancelationData={setCancelationData} />}
    </div>
  )
}

export default AllApprovedLeaves