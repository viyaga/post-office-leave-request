import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addLeaveData.scss'
import ZodSelectInput from "@/components/shared/zodSelectInput/ZodSelectInput"
import { BranchOfficeNames } from "@/data"

const leaveSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }).max(50),
    designation: z.string().min(1, { message: "Designation Required" }).max(10),
    officeName: z.string().min(1, { message: "Office Required" }).max(50),
    from: z.string().max(20),
    to: z.string().max(20),
    substituteName: z.string().max(50),
    accountNo: z.string().max(20),
    remarks: z.string().max(100),
    leaveType: z.string().max(100),
    status: z.string().min(1, { message: "Status Required" }).max(20),
})

const AddLeaveData = ({ setOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(leaveSchema) })

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

    const onLeaveDataSubmit = async (props) => {

        console.log({ props });


    }

    return (
        <div className="addLeaveRequest">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add New Request</h1>
                <form onSubmit={handleSubmit(onLeaveDataSubmit)}>

                    <div className="item">
                        <label>Office *</label>
                        <ZodSelectInput name="officeName" register={register} defaultValue="Select" options={BranchOfficeNames} error={errors['officeName']} />
                    </div>

                    <div className="item">
                        <label>Designation *</label>
                        <ZodSelectInput name="designation" register={register} defaultValue="Select" options={designationOptions} error={errors['designation']} />
                    </div>

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

                    <input type="submit" defaultValue={isSubmitting ? "Adding..." : "Add"} />
                </form>
            </div>
        </div>
    )
}

export default AddLeaveData