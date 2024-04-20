import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addLeaveData.scss'
import ZodSelectInput from "@/components/shared/zodSelectInput/ZodSelectInput"
import toast from "react-hot-toast"
import { createLeaveData, findNumberOfDays, getAllOffices, getEmployeeName, updatePendingLeaveData } from "@/services"
import { useDispatch } from "react-redux"
import { addPendingLeave, editPendingLeave } from "@/redux/slices/commonSlice"
import { useEffect, useState } from "react"
import moment from "moment"

const leaveSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }).max(50),
    designation: z.string().min(1, { message: "Designation Required" }).max(10),
    officeName: z.string().min(1, { message: "Office Required" }).max(50),
    from: z.string().min(1, { message: "Invalid Date" }).max(20),
    to: z.string().min(1, { message: "Invalid Date" }).max(20),
    substituteName: z.string().min(1, { message: "Substitute Required" }).max(50),
    accountNo: z.string().min(1, { message: "Account NO Required" }).max(20),
    remarks: z.string().min(1, { message: "Remarks Required" }).max(100),
    leaveType: z.string().min(1, { message: "Leave Type Required" }).max(100),
    status: z.string().min(1, { message: "Status Required" }).max(20),
})

const AddLeaveData = ({ editData, setEditData, setOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues } = useForm({ resolver: zodResolver(leaveSchema) })
    const [offices, setOffices] = useState([])
    const dispatch = useDispatch()

    const formInputs = [
        { type: "date", name: "from", placeholder: "From", label: "From" },
        { type: "date", name: "to", placeholder: "To", label: "To" },
        { type: "text", name: "substituteName", placeholder: "Substitute", label: "Substitute" },
        { type: "text", name: "accountNo", placeholder: "Account", label: "Account" },
    ]

    const designationOptions = ['BPM', 'ABPM', 'ABPM I', 'ABPM II', 'DAK SEVAK']
    const remarkOptions = ['Personal affairs', 'Officiating', 'Stop Gap arrangement', 'POD', 'Induction training', 'Maternity leave', 'Medical affairs']
    const leaveTypeOptions = ['Paid Leave', 'LWA', 'Stop Gap Arrangement', 'Maternity', 'Training', 'Others']
    const leaveStatusOptions = ['Approved', 'Pending']

    const handleClose = () => {
        setOpen(false)
        setEditData(null)
    }

    const fetchOffices = async (e) => {
        if (!e.target.value) {
            setOffices([])
            reset({ name: '' })
        }

        if (offices.length > 0) return
        const res = await getAllOffices()
        if (res.error) return toast.error(res.error)

        if (res.offices) {
            setOffices(res.offices)
        }
    }

    const fetchEmployeeName = async (e) => {
        if(!e.target.value) reset({ name: '' })

        if (!getValues('designation') || !e.target.value) return

        const res = await getEmployeeName(e.target.value, getValues('designation'))
        if (res.error) return toast.error(res.error)

        if (res.employeeName) {
            reset({ name: res.employeeName })
        }
        console.log({ des: getValues('designation'), off: getValues('officeName'), name: res.employeeName });
    }

    const onLeaveDataSubmit = async (props) => {
        const { from, to } = props

        // calculate days ========================
        const fromDate = new Date(from)
        const toDate = new Date(to)

        const days = findNumberOfDays(fromDate, toDate)
        if (days < 1) return toast.error("Invalid Date")
        props.days = days

        // set status=======
        if (props.status === 'approved') {
            props.status = 1
        } else {
            props.status = 0
        }

        let res = null
        if (editData) {
            res = await updatePendingLeaveData(editData._id, props)
            if (res.success) {
                toast.success(res.success)
                setOpen(false)
                setEditData(null)
                dispatch(editPendingLeave(res.leave))
            }
        } else {
            res = await createLeaveData(props)
            if (res.success) {
                toast.success(res.success)
                setOpen(false)
                dispatch(addPendingLeave(res.leave))
            }
        }

        if (res.error) return toast.error(res.error)

    }

    useEffect(() => {
        if (editData) {
            reset({ ...editData, status: editData.status === 1 ? 'approved' : 'pending', from: moment(editData.from).format('YYYY-MM-DD'), to: moment(editData.to).format('YYYY-MM-DD') })
        }
    }, [editData])

    return (
        <div className="addLeaveRequest">
            <div className="modal">
                <span className="close" onClick={handleClose}>
                    X
                </span>
                <h1>{editData ? "Update" : "Add New"} Request</h1>
                <form onSubmit={handleSubmit(onLeaveDataSubmit)}>

                    <div className="item">
                        <label>Designation *</label>
                        <ZodSelectInput name="designation" register={register} onChangeFunction={fetchOffices} defaultValue="Select" options={designationOptions} error={errors['designation']} />
                    </div>

                    <div className="item">
                        <label>Office *</label>
                        <select {...register("officeName")} onChange={fetchEmployeeName}>
                            <option value="">Select</option>
                            {offices && offices.map((item, index) =>
                                <option key={index} value={item._id}>{item.officeName}</option>
                            )}
                        </select>
                        {errors.officeName && (
                            <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }}>{errors.officeName.message}</p>
                        )}
                    </div>

                    {/* <div className="item">
                        <label>Office *</label>
                        <ZodSelectInput name="officeName" register={register} defaultValue="Select" options={offices} error={errors['officeName']} />
                    </div> */}

                    <div className="item">
                        <label>Name *</label>
                        <ZodFormInput type="text" name="name" register={register} placeholder="Name" error={errors["name"]} />
                    </div>

                    <div className="item">
                        <label>Remarks</label>
                        <ZodSelectInput name="remarks" register={register} defaultValue="Select" options={remarkOptions} error={errors['remarks']} />
                    </div>

                    {formInputs.map(item => {
                        return (
                            <div className="item" key={item.label}>
                                <label>{item.label}</label>
                                <ZodFormInput type={item.type} name={item.name} register={register} placeholder={item.placeholder} error={errors[item.name]} />
                            </div>
                        )
                    })}

                    <div className="item">
                        <label>Leave Type</label>
                        <ZodSelectInput name="leaveType" register={register} defaultValue="Select" options={leaveTypeOptions} error={errors['leaveType']} />
                    </div>
                    <div className="item">
                        <label>Status *</label>
                        <ZodSelectInput name="status" register={register} defaultValue="Select" options={leaveStatusOptions} error={errors['status']} />
                    </div>

                    {editData
                        ? <input type="submit" defaultValue={isSubmitting ? "Updating..." : "Update"} />
                        : <input type="submit" defaultValue={isSubmitting ? "Adding..." : "Add"} />
                    }
                </form>
            </div>
        </div>
    )
}

export default AddLeaveData