"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './data-page.scss'
import DataTable from "./dataTable/DataTable";
import { getLeaveDataByCategory } from "@/services";
import { leaveDataColums, stopGapArrangementColums } from '@/data'
import FilterByDate from "./filterByDate/FilterByDate";

const DataPage = (props) => {

  const {
    substitutes, employees, category, fromDate, toDate, officeId,
    employeeId, substituteId, remarks
  } = props

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [rows, setRows] = useState(null)

  let columns = leaveDataColums
  if (category === 'stop gap arrangement') {
    columns = stopGapArrangementColums
  }

  const fetchData = async (category, fromDate, toDate, officeId, employeeId, substituteId, remarks) => {
    const res = await getLeaveDataByCategory(category, fromDate, toDate, officeId, employeeId, substituteId, remarks)
    console.log({ err: res?.error });
    if (res.error) return toast.error("An Error Occured While Fetching Datas")
    if (res.leaves) {
      const idAddedData = res.leaves.map((item, index) => ({ id: index + 1, ...item }))
      setRows(idAddedData)
    }
  }

  useEffect(() => {
    fetchData(category, fromDate, toDate, officeId, employeeId, substituteId, remarks)
  }, [category, fromDate, toDate, officeId, employeeId, substituteId, remarks])


  return (
    <div className="leave-requests">
      <div className="info">
        <h2>{category}</h2>
        <button onClick={() => setIsFilterOpen(true)}>Filter</button>
      </div>
      {(rows && rows.length > 0)
        ? < DataTable columns={columns} rows={rows} />
        : rows
          ? <p>No Data Found</p>
          : <p>Loading...</p>
      }
      {isFilterOpen && <FilterByDate setIsFilterOpen={setIsFilterOpen} substitutes={substitutes} employees={employees} />}
    </div>
  )
}

export default DataPage
