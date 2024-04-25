import ZodFormInput from "@/components/shared/zodFormInput/ZodFormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import './filterByDate.scss'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import moment from "moment"
import { dateToIsoString, findNumberOfDays } from "@/services"
import toast from "react-hot-toast"
import ZodSelectInput from "@/components/shared/zodSelectInput/ZodSelectInput"

const filterSchema = z.object({
    fromDate: z.string().min(1, { message: "Date Required" }).max(12),
    toDate: z.string().min(1, { message: "Date Required" }).max(12),
})

const FilterByDate = ({ setIsFilterOpen, offices, regularEmployees, substitutes }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const currentDate = new Date()

    const from = searchParams.get('fromDate') || currentDate
    const fromDate = moment(from).format("YYYY-MM-DD")

    const to = searchParams.get('toDate') || currentDate
    const toDate = moment(to).format("YYYY-MM-DD")

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(filterSchema), defaultValues: {fromDate, toDate} })

    const formInputs = [
        { type: "date", name: "fromDate", placeholder: "From", label: "From" },
        { type: "date", name: "toDate", placeholder: "To", label: "To" },
    ]

    const remarkOptions = ['Personal affairs', 'Officiating', 'POD', 'Induction training', 'Maternity leave', 'Medical affairs']

    const onFilterSubmit = async ({ fromDate, toDate, offices,  }) => {

        const fromDateIso = dateToIsoString(fromDate)
        const toDateIso = dateToIsoString(toDate)
        const days = findNumberOfDays(fromDate, toDate)
        if(days < 1) return toast.error("Invalid Date")

        console.log({gt: fromDateIso > toDate , month: new Date(fromDateIso).getMonth() === new Date(toDateIso).getMonth() });
        const category = searchParams.get('cat')

        router.push(`${pathname}/?cat=${category}&&fromDate=${fromDateIso}&&toDate=${toDateIso}`)
        setIsFilterOpen(false)

    }

    return (
        <div className="filter">
            <div className="modal">
                <span className="close" onClick={() => setIsFilterOpen(false)}>
                    X
                </span>
                <h1>Filter</h1>
                <form onSubmit={handleSubmit(onFilterSubmit)}>

                    {formInputs.map(item => {
                        return (
                            <div className="item" key={item.label}>
                                <label>{item.label}</label>
                                <ZodFormInput type={item.type} name={item.name} register={register} placeholder={item.placeholder} error={errors[item.name]} />
                            </div>
                        )
                    })}
                     <div className="item">
                        <label><p>Office</p><span>(optional)</span></label>
                        <div>
                            <select {...register("officeId")}>
                                <option value="">Select</option>
                                {offices && offices.map((item, index) =>
                                    <option key={index} value={item._id}>{item.officeName}</option>
                                )}
                            </select>
                            {errors.officeId && (
                                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }} >{errors.officeId.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="item">
                        <label><p>Employee</p><span>(optional)</span></label>
                        <div>
                            <select {...register("employeeId")}>
                                <option value="">Select</option>
                                {regularEmployees && regularEmployees.map((item, index) =>
                                    <option key={index} value={item._id}>{item.name}</option>
                                )}
                            </select>
                            {errors.employeeId && (
                                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }} >{errors.employeeId.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="item">
                        <label><p>Substitute</p><span>(optional)</span></label>
                        <div>
                            <select {...register("substituteId")}>
                                <option value="">Select</option>
                                {substitutes && substitutes.map((item, index) =>
                                    <option key={index} value={item._id}>{item.name}</option>
                                )}
                            </select>
                            {errors.substituteId && (
                                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }} >{errors.substituteId.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="item">
                        <label><p>Remarks</p><span>(optional)</span></label>
                        <ZodSelectInput name="remarks" register={register} defaultValue="Select" options={remarkOptions} error={errors['remarks']} />
                    </div>
                    <input type="submit" defaultValue="Submit" />
                </form>
            </div>
        </div>
    )
}

export default FilterByDate