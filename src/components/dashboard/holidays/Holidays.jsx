"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './holidays.scss'
import { getAllHolidayData } from "@/services";
import { HolidayColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setHoliday } from "@/redux/slices/commonSlice";
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";
import AddHoliday from "./addHoliday/AddHoliday";
import DeleteHoliday from "./deleteHoliday/DeleteHoliday";

const Holidays = () => {
    const { holiday } = useSelector(state => state.common)
    const [isLoading, setIsLoading] = useState(true)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const fetchData = async () => {
        const res = await getAllHolidayData()
        if (res.error) toast.error("An Error Occured While Fetching Data")
        if (res.holidays) {
            dispatch(setHoliday(res.holidays))
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="holidays">
            <div className="info">
                <h2>Holidays</h2>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            {(holiday && holiday.length > 0)
                ? < DataTableWithActions columns={HolidayColums} rows={holiday} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
                : isLoading
                    ? <p>Loading...</p>
                    : <p>No Data Found</p>
            }
            {open && <AddHoliday editData={editData} setEditData={setEditData} setOpen={setOpen} />}
            {deleteData && <DeleteHoliday deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default Holidays
