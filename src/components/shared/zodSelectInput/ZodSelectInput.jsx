
const ZodSelectInput = (props) => {
    const { name, className = '', register, defaultValue, options, error } = props

    return (
        <div>
            <select {...register(name)} className={className}>
                <option value="">{defaultValue}</option>
                {options && options.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                )}
            </select>
            {error && (
                <p className='text-danger font-w600'>{error.message}</p>
            )}
        </div>
    )
}

export default ZodSelectInput