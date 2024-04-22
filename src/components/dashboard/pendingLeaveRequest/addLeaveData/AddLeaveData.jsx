import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addLeaveData.scss'
import ZodSelectInput from "@/components/shared/zodSelectInput/ZodSelectInput"
import toast from "react-hot-toast"
import { createLeaveData, findNumberOfDays, getEmployeeName, getMonthAndYear, getNonWorkingSubstitute, isHoliday, updatePendingLeaveData } from "@/services"
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

const AddLeaveData = ({ substitutes, offices, holidays, editData, setEditData, setOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, getValues, setValue } = useForm({ resolver: zodResolver(leaveSchema) })
    const dispatch = useDispatch()

    const designationOptions = ['BPM', 'ABPM', 'ABPM I', 'ABPM II', 'DAK SEVAK']
    const remarkOptions = ['Personal affairs', 'Officiating', 'Stop Gap arrangement', 'POD', 'Induction training', 'Maternity leave', 'Medical affairs']
    const leaveTypeOptions = ['Paid Leave', 'LWA', 'Stop Gap Arrangement', 'Maternity', 'Training', 'Others']
    const leaveStatusOptions = ['Pending', 'Approved']

    const handleClose = () => {
        setOpen(false)
        setEditData(null)
    }

    const fetchEmployeeName = async (e) => {
        if (!editData && !e?.target?.value) {
            setValue('name', '')
        }

        if (getValues('officeName')) {
            const res = await getEmployeeName(getValues('officeName'), e.target.value)
            if (res.error) {
                setValue('name', '')
                toast.error(res.error)
                return
            }

            if (res.employeeName) {
                setValue('name', res.employeeName)
            }
        }

    }

    const fetchEmployeeName1 = async (e) => {
        if (!e.target.value) return setValue('name', '')

        if (!getValues('designation') || !e.target.value) return

        const res = await getEmployeeName(e.target.value, getValues('designation'))
        if (res.error) {
            setValue('name', '')
            toast.error(res.error)
            return
        }

        if (res.employeeName) {
            setValue('name', res.employeeName)
        }

    }

    const getEmployeeAccount = (e) => {
        const accountNo = substitutes.filter((item) => item.accountNo === e.target.value)[0]?.accountNo
        setValue('accountNo', accountNo)
    }

    const checkIsHoliday = (e) => {
        const holiday = isHoliday(holidays, e.target.value) //date
        console.log({ holiday });
    }

    const onLeaveDataSubmit = async (props) => {
        const { from, to } = props

        const fromDate = new Date(from)
        const toDate = new Date(to)
        const days = findNumberOfDays(fromDate, toDate)
        if (days < 1) return toast.error("Invalid Date")

        const leaveData = {
            name: props.name,
            designation: props.designation,
            officeId: props.officeName,
            officeName: offices.find((office) => office._id === props.officeName)?.officeName,
            leaveMonth: getMonthAndYear(fromDate),
            from: fromDate,
            to: toDate,
            days: days,
            substituteName: substitutes.find((item) => item.accountNo === props.substituteName)?.name,
            accountNo: props.accountNo,
            remarks: props.remarks,
            leaveType: props.leaveType,
            status: props.status === 'approved' ? 1 : 0,
        }

        let res = null
        if (editData) {
            res = await updatePendingLeaveData(editData._id, leaveData)
            if (res.success) {
                toast.success(res.success)
                setOpen(false)
                setEditData(null)
                dispatch(editPendingLeave(res.leave))
            }
        } else {
            res = await createLeaveData(leaveData)
            if (res.success) {
                toast.success(res.success)
                setOpen(false)
                dispatch(addPendingLeave(res.leave))
            }
        }

        if (res.error) return toast.error(res.error, {duration: 7000})

    }

    useEffect(() => {
        if (editData) {
            console.log({ editData });
            reset({
                ...editData, status: editData.status === 1 ? 'approved' : 'pending',
                from: moment(editData.from).format('YYYY-MM-DD'), to: moment(editData.to).format('YYYY-MM-DD'),
                officeName: editData.officeId, substituteName: editData.accountNo,
            })
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
                        <ZodSelectInput name="designation" register={register} onChangeFunction={fetchEmployeeName} defaultValue="Select" options={designationOptions} error={errors['designation']} />
                    </div>

                    <div className="item">
                        <label>Office *</label>
                        <div>
                            <select {...register("officeName")} onChange={fetchEmployeeName1}>
                                <option value="">Select</option>
                                {offices && offices.map((item, index) =>
                                    <option key={index} value={item._id}>{item.officeName}</option>
                                )}
                            </select>
                            {errors.officeName && (
                                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }} >{errors.officeName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="item">
                        <label>Name *</label>
                        <ZodFormInput type="text" disabled={true} name="name" register={register} placeholder="Name" error={errors["name"]} />
                    </div>

                    <div className="item">
                        <label>Remarks</label>
                        <ZodSelectInput name="remarks" register={register} defaultValue="Select" options={remarkOptions} error={errors['remarks']} />
                    </div>

                    <div className="item">
                        <label>From *</label>
                        <ZodFormInput type="date" name="from" register={register} placeholder="From *" error={errors["from"]} onChangeFunction={checkIsHoliday} />
                    </div>

                    <div className="item">
                        <label>To *</label>
                        <ZodFormInput type="date" name="to" register={register} placeholder="To *" error={errors["to"]} onChangeFunction={checkIsHoliday} />
                    </div>

                    <div className="item">
                        <label>Substitute *</label>
                        <div>
                            <select {...register("substituteName")} onChange={getEmployeeAccount}>
                                <option value="">Select</option>
                                {substitutes && substitutes.map((item, index) =>
                                    <option key={index} value={item.accountNo}>{item.name}</option>
                                )}
                            </select>
                            {errors.substituteName && (
                                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }}>{errors.substituteName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="item">
                        <label>Account *</label>
                        <ZodFormInput type="text" disabled={true} name="accountNo" register={register} placeholder="Account Number" error={errors["accountNo"]} />
                    </div>

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