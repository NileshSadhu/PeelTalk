function CustomInput({
    id,
    label,
    placeholder,
    name,
    value,
    onChange,
    type = "text",
    error, // new prop to handle error state
}) {
    return (
        <div className="mb-6 relative">
            <label
                htmlFor={id}
                className="balsamiq-sans-bold block mb-1 mt-2 font-medium text-amber-900"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                autoComplete="off"
                className={`
                    rounded-md 
                    p-3 
                    w-full 
                    text-sm 
                    placeholder:text-sm 
                    sm:placeholder:text-base
                    bg-white 
                    shadow-[0_4px_10px_rgba(253,215,85,0.6)] 
                    focus:outline-none 
                    focus:shadow-[0_6px_12px_rgba(253,215,85,0.8)] 
                    transition-shadow duration-300
                    ${error ? "border-2 border-red-500" : "border-none"}
                `}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                required
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

        </div>
    );
}

export default CustomInput;
