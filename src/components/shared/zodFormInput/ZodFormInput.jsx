"use client"

import { red } from "@mui/material/colors"

const ZodFormInput = (props) => {
    const { className = '', type, disabled = false, name, id, register, placeholder, error } = props
    return (
        <div>
            <input type={type} {...register(name, { valueAsNumber: type === 'number' })} id={id} disabled={disabled}  className={className} placeholder={placeholder} />
            {error && (
                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }}>{error.message}</p>
            )}
        </div>
    )
}

export default ZodFormInput