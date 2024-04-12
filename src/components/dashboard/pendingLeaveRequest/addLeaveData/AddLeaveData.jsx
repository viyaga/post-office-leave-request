import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addLeaveData.scss'

const leaveSchema = z.object({
    email: z.string().email().min(1, { message: "Email Required" }).max(75, { message: "Email must contain at most 75 characters" }),
    password: z.string().min(6, { message: "Password  must contain at least 6 characters" }).max(20, { message: "Password must contain at most 20 characters" }),
    subdivisionName: z.string().min(1, { message: "Subdivision Required" }).max(75, { message: "Subdivision must contain at most 75 characters" })
})

const AddLeaveData = ({ setOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(leaveSchema) })

    const formInputs = [
        { type: "text", name: "name", placeholder: "email" },
        { type: "text", name: "designation", placeholder: "email" },
        { type: "text", name: "officeName", placeholder: "email" },
        { type: "text", name: "from", placeholder: "email" },
        { type: "text", name: "to", placeholder: "email" },
        { type: "text", name: "substituteName", placeholder: "email" },
        { type: "text", name: "accountNo", placeholder: "email" },
        { type: "password", name: "remarks", placeholder: "password" },
    ]

    const onLeaveDataSubmit = async () => {

    }

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add New Request</h1>
                <form onSubmit={handleSubmit(onLeaveDataSubmit)}>
                    {formInputs.map(item => {
                        return (
                            <div className="item" key={item.label}>
                                <label>{item.label}</label>
                                <ZodFormInput type={item.type} name={item.name} register={register} placeholder={item.placeholder} error={errors[item.name]} />
                            </div>
                        )
                    })}

                    <button>{isSubmitting ? 'Loading...' : 'Send'}</button>
                </form>
            </div>
        </div>
    )
}

export default AddLeaveData