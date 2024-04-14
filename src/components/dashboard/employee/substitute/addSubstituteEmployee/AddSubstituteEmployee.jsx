import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addSubstituteEmployee.scss'
import ZodSelectInput from "@/components/shared/zodSelectInput/ZodSelectInput"
import { BranchOfficeNames } from "@/data"

const leaveSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }).max(50),
    designation: z.string().min(1, { message: "Designation Required" }).max(10),
    officeName: z.string().min(1, { message: "Office Required" }).max(50),
})

const AddSubstituteEmployee = ({ setOpen }) => {
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
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add New Regular Employee</h1>
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

                    <input type="submit" defaultValue={isSubmitting ? "Adding..." : "Add"} />
                </form>
            </div>
        </div>
    )
}

export default AddSubstituteEmployee