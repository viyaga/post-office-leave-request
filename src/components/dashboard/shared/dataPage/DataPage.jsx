"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './data-page.scss'
import DataTable from "./dataTable/DataTable";
import { getLeaveDataByCategory } from "@/services";
import { leaveDataColums } from '@/data'
import FilterByDate from "./filterByDate/FilterByDate";

const DataPage = ({ category, fromDate, toDate }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [rows, setRows] = useState(null)

  const fetchData = async (category, fromDate, toDate) => {
    const res = await getLeaveDataByCategory(category, fromDate, toDate)
    console.log({err: res?.error});
    if (res.error) return toast.error("An Error Occured While Fetching Datas")
    if (res.leaves) {
      const idAddedData = res.leaves.map((item, index) => ({ id: index + 1, ...item }))
      setRows(idAddedData)
      console.log({idAddedData});
    }
  }

  useEffect(() => {
    fetchData(category, fromDate, toDate)
  }, [category, fromDate, toDate])


  return (
    <div className="leave-requests">
      <div className="info">
        <h2>{category}</h2>
        <button onClick={() => setIsFilterOpen(true)}>Filter</button>
      </div>
      {(rows && rows.length > 0)
        ? < DataTable columns={leaveDataColums} rows={rows} />
        : rows
          ? <p>No Data Found</p>
          : <p>Loading...</p>
      }
      {isFilterOpen && <FilterByDate setIsFilterOpen={setIsFilterOpen} />}
    </div>
  )
}

export default DataPage
