import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addSubstituteEmployee.scss'

const substituteSchema = z.object({
    substituteName: z.string().min(1, { message: "Name Required" }).max(50),
    accountNo: z.string().min(1, { message: "Account Number Required" }).max(20),
})

const AddSubstituteEmployee = ({ setOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(substituteSchema) })

    const formInputs = [
        { type: "text", name: "substituteName", placeholder: "Name", label: "Name" },
        { type: "text", name: "accountNo", placeholder: "Account Number", label: "Account Number" },
    ]

    const onLeaveDataSubmit = async (props) => {

        console.log({ props });


    }

    return (
        <div className="addSubstituteEmployee">
            <div className="modal">
                <span className="close" onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add New Substitute Employee</h1>
                <form onSubmit={handleSubmit(onLeaveDataSubmit)}>

                    {formInputs.map(item => {
                        return (
                            <div className="item" key={item.label}>
                                <label>{item.label}</label>
                                <ZodFormInput type={item.type} name={item.name} register={register} placeholder={item.placeholder} error={errors[item.name]} />
                            </div>
                        )
                    })}

                    <input type="submit" defaultValue={isSubmitting ? "Adding..." : "Add"} />
                </form>
            </div>
        </div>
    )
}

export default AddSubstituteEmployee