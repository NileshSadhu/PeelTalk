function CustomInput({ label, placeholder }) {
    return (
        <div>
            <label htmlFor="email" className="balsamiq-sans-bold block mb-1 mt-2 font-medium text-amber-900">{label}</label>
            <input
                id="email"
                type="email"
                autoComplete="off"
                className="border border-amber-900 rounded-md drop-shadow-[0_4px_6px_rgba(253,224,71,0.4)] p-3 w-md placeholder:text-sm"
                placeholder={placeholder}
            />
        </div>
    )
}

export default CustomInput;
