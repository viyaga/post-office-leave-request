"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './holidays.scss'
import { getAllHolidayData } from "@/services";
import { HolidayColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setHoliday } from "@/redux/slices/commonSlice";
import AddSubstituteEmployee from "./addSubstituteEmployee/AddSubstituteEmployee";
import DeleteSubstituteEmployee from "./deleteSubstitute/DeleteSubstituteEmployee";
import DataTableWithActions from "../shared/dataTableWithActions/DataTableWithActions";

const Holidays = () => {
    const { substitute } = useSelector(state => state.common.employee)
    const [isLoading, setIsLoading] = useState(true)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const fetchData = async () => {
        const res = await getAllHolidayData()
        if (res.error) toast.error("An Error Occured While Fetching Data")
        if (res.employees) {
            dispatch(setHoliday(res.employees))
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
            {(substitute && substitute.length > 0)
                ? < DataTableWithActions columns={HolidayColums} rows={substitute} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
                : isLoading
                    ? <p>Loading...</p>
                    : <p>No Data Found</p>
            }
            {open && <AddSubstituteEmployee editData={editData} setEditData={setEditData} setOpen={setOpen} />}
            {deleteData && <DeleteSubstituteEmployee deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default Holidays
