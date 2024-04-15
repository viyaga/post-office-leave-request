"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './substituteEmployee.scss'
import { addIdToDataGridRows, getData } from "@/services";
import { substituteEmployeeColums } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setSubstituteEmployee } from "@/redux/slices/commonSlice";
import DataTableWithActions from "../../shared/dataTableWithActions/DataTableWithActions";
import AddRegularEmployee from "./addSubstituteEmployee/AddSubstituteEmployee";
import DeleteSubstituteEmployee from "./deleteSubstituteEMployee/DeleteSubstituteEMployee";

const SubstituteEmployee = () => {
    const { substitute } = useSelector(state => state.common.employee)
    const [deleteData, setDeleteData] = useState(null)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const fetchData = async (type, category) => {
        const res = await getData(type, category)
        if (res.error) return toast.error("An Error Occured While Fetching Data")
        if (res.data) {
            const idAddedData = addIdToDataGridRows(res.data)
            const BOs = idAddedData.map(item => item.officeName)
            console.log({ BOs })
            dispatch(setSubstituteEmployee(idAddedData))
        }
    }

    useEffect(() => {
        fetchData('employees', 'substitute')
    }, [])

    return (
        <div className="substituteEmployee">
            <div className="info">
                <h2>Pending</h2>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            {(substitute && substitute.length > 0)
                ? < DataTableWithActions columns={substituteEmployeeColums} rows={substitute} setDeleteData={setDeleteData} />
                : substitute
                    ? <p>No Data Found</p>
                    : <p>Loading...</p>
            }
            {open && <AddRegularEmployee setOpen={setOpen} />}
            {deleteData && <DeleteSubstituteEmployee deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default SubstituteEmployee