"use client"

import { useEffect, useState } from "react";
import './substituteEmployee.scss'
import { substituteEmployeeColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setSubstituteEmployee } from "@/redux/slices/commonSlice";
import DataTableWithActions from "../../shared/dataTableWithActions/DataTableWithActions";
import AddSubstituteEmployee from "./addSubstituteEmployee/AddSubstituteEmployee";
import DeleteSubstituteEmployee from "./deleteSubstitute/DeleteSubstituteEmployee";
import DashboardLoading from "@/components/shared/dashboardLoading/DashboardLoading";

const SubstituteEmployee = ({ substituteEmployeeData }) => {
    const { substitute } = useSelector(state => state.common.employee)
    const [deleteData, setDeleteData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSubstituteEmployee(substituteEmployeeData))
    }, [dispatch, substituteEmployeeData])

    return (
        <div className="substituteEmployee">
            <div className="info">
                <h2>Substitute</h2>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            {(substitute?.length > 0)
                ? < DataTableWithActions columns={substituteEmployeeColums} rows={substitute} setOpen={setOpen} setEditData={setEditData} setDeleteData={setDeleteData} />
                : (substitute?.length === 0)
                    ? <p>No Data Found</p>
                    : <DashboardLoading />
            }
            {open && <AddSubstituteEmployee editData={editData} setEditData={setEditData} setOpen={setOpen} />}
            {deleteData && <DeleteSubstituteEmployee deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default SubstituteEmployee
