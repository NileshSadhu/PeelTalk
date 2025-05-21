function CustomInput({ id, label, placeholder }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="balsamiq-sans-bold block mb-1 mt-2 font-medium text-amber-900">
                {label}
            </label>
            <input
                id={id}
                type={id === 'password' ? 'password' : id === 'email' ? 'email' : 'text'}
                autoComplete="off"
                className="border border-amber-900 rounded-md drop-shadow-[0_4px_6px_rgba(253,224,71,0.4)] p-3 w-full text-sm placeholder:text-sm sm:placeholder:text-base"
                placeholder={placeholder}
            />
        </div>
    );
}

export default CustomInput;
