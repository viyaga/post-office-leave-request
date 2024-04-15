"use client"

import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './addRegularEmployee.scss'
import ZodSelectInput from "@/components/shared/zodSelectInput/ZodSelectInput"
import { BranchOfficeNames } from "@/data"
import { useEffect } from "react"
import { createRegularEmployee, updateRegularEmployee } from "@/services"
import toast from "react-hot-toast"

const regularEmployeeSchema = z.object({
    name: z.string().min(1, { message: "Name Required" }).max(50),
    designation: z.string().min(1, { message: "Designation Required" }).max(10),
    officeName: z.string().min(1, { message: "Office Required" }).max(50),
})

const AddRegularEmployee = ({ editData, setEditData, setOpen }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(regularEmployeeSchema) })

    const designationOptions = ['BPM', 'ABPM', 'ABPM I', 'ABPM II', 'DAK SEVAK']

    const handleClose = () => {
        setOpen(false)
        setEditData(null)
    }

    const onEmployeeDataSubmit = async ({ name, designation, officeName }) => {

        let res = null
        if (editData) {
            res = await updateRegularEmployee(editData._id, { name, designation, officeName })
        } else {
            res = await createRegularEmployee({ name, designation, officeName })
        }

        if (res.error) return toast.error(res.error)

        toast.success(res.success)
        setOpen(false)
        setEditData(null)
    }

    useEffect(() => {
        if (editData) {
            reset(editData)
            console.log({ editData });
        }
    }, [editData])

    return (
        <div className="addRegularEmployee">
            <div className="modal">
                <span className="close" onClick={handleClose}>
                    X
                </span>
                <h1>{editData ? "Update " : "Add New Regular"} Employee</h1>
                <form onSubmit={handleSubmit(onEmployeeDataSubmit)}>

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
                    {editData
                        ? <input type="submit" defaultValue={isSubmitting ? "Updating..." : "Update"} />
                        : <input type="submit" defaultValue={isSubmitting ? "Adding..." : "Add"} />
                    }

                </form>
            </div>
        </div>
    )
}

export default AddRegularEmployee