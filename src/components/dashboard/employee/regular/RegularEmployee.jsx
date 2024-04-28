"use client"

import { useEffect, useState, useTransition } from "react";
import toast from 'react-hot-toast'
import './regularEmployee.scss'
import { getAllRegularEmployeesData } from "@/services";
import { regularEmployeeColumns } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setRegularEmployee } from "@/redux/slices/commonSlice";
import DataTableWithActions from "../../shared/dataTableWithActions/DataTableWithActions";
import AddRegularEmployee from "./addRegularEmployee/AddRegularEmployee";
import DeleteRegularEmployee from "./deleteRegularEmployee/DeleteRegularEmployee";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";

const RegularEmployee = ({ offices }) => {
    const { regular } = useSelector(state => state.common.employee)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const fetchData = async () => {

        const res = await getAllRegularEmployeesData()
        if (res.error) return toast.error("An Error Occured While Fetching Data")
        if (res.employees) {
            dispatch(setRegularEmployee(res.employees))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="regularEmployee">
            <div className="info">
                <h2>Regular</h2>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            {(regular?.length > 0)
                ? < DataTableWithActions columns={regularEmployeeColumns} rows={regular} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
                : (regular?.length === 0)
                    ? <p>No Data Found</p>
                    : <DashboardLoading />
            }
            {open && <AddRegularEmployee offices={offices} editData={editData} setEditData={setEditData} setOpen={setOpen} />}
            {deleteData && <DeleteRegularEmployee deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default RegularEmployee