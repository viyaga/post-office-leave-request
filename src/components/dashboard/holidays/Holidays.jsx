"use client"

import { useEffect, useState } from "react";
import './holidays.scss'
import { HolidayColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setHoliday } from "@/redux/slices/commonSlice";
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddHoliday from "./addHoliday/AddHoliday";
import DeleteHoliday from "./deleteHoliday/DeleteHoliday";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";

const Holidays = ({ holidayData }) => {
    const { holidays } = useSelector(state => state.common)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setHoliday(holidayData))
    }, [dispatch, holidayData])

    return (
        <div className="holidays">
            <div className="info">
                <h2>Holidays</h2>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            {(holidays?.length > 0)
                ? < DataTableWithActions columns={HolidayColums} rows={holidays} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
                : (holidays?.length === 0)
                    ? <p>No Data Found</p>
                    : <DashboardLoading />
            }
            {open && <AddHoliday editData={editData} setEditData={setEditData} setOpen={setOpen} />}
            {deleteData && <DeleteHoliday deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default Holidays
