"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './allApprovedLeaves.scss'
import { HolidayColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddHoliday from "./addHoliday/AddHoliday";
import DeleteHoliday from "./deleteHoliday/DeleteHoliday";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";
import { MdFilterList } from "react-icons/md";

const AllApprovedLeaves = () => {
    const { holiday } = useSelector(state => state.common)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const fetchData = async () => {
        // const res = await getAllHolidayData()
        // if (res.error) toast.error("An Error Occured While Fetching Data")
        // if (res.holidays) {
        //     dispatch(setHoliday(res.holidays))
        // }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="holidays">
            <div className="info">
                <h2>Approved</h2>
                <button onClick={() => setOpen(true)}><MdFilterList size={24} /></button>
            </div>
            {(holiday?.length > 0)
                ? < DataTableWithActions columns={HolidayColums} rows={[]} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
                : (holiday?.length === 0)
                    ? <p>No Data Found</p>
                    : <DashboardLoading />
            }
            {open && <AddHoliday editData={editData} setEditData={setEditData} setOpen={setOpen} />}
            {deleteData && <DeleteHoliday deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default AllApprovedLeaves