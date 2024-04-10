"use client"

const ZodFormInput = (props) => {
    const { className = '', type, name, id, register, placeholder, error } = props
    return (
        <div>
            <input type={type} {...register(name, { valueAsNumber: type === 'number' })} id={id} className={className} placeholder={placeholder} />
            {error && (
                <p className='text-danger font-w600'>{error.message}</p>
            )}
        </div>
    )
}

export default ZodFormInput