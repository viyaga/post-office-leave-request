"use client"

import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import './regularEmployee.scss'
import { addIdToDataGridRows, getData } from "@/services";
import { regularEmployeeColumns } from '@/data'
import { useDispatch, useSelector } from "react-redux";
import { setRegularEmployee } from "@/redux/slices/commonSlice";
import DataTableWithActions from "../../shared/dataTableWithActions/DataTableWithActions";
import AddRegularEmployee from "./addRegularEmployee/AddRegularEmployee";
import DeleteRegularEmployee from "./deleteRegularEmployee/DeleteRegularEmployee";

const RegularEmployee = () => {
    const { regular } = useSelector(state => state.common.employee)
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
            dispatch(setRegularEmployee(idAddedData))
        }
    }

    useEffect(() => {
        fetchData('employees', 'regular')
    }, [])

    return (
        <div className="regularEmployee">
            <div className="info">
                <h2>Pending</h2>
                <button onClick={() => setOpen(true)}>Add New</button>
            </div>
            {(regular && regular.length > 0)
                ? < DataTableWithActions columns={regularEmployeeColumns} rows={regular} setDeleteData={setDeleteData} />
                : regular
                    ? <p>No Data Found</p>
                    : <p>Loading...</p>
            }
            {open && <AddRegularEmployee setOpen={setOpen} />}
            {deleteData && <DeleteRegularEmployee deleteData={deleteData} setDeleteData={setDeleteData} />}
        </div>
    )
}

export default RegularEmployee