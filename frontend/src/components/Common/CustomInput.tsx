interface CustomInputProps {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    error?: string;
    showIcon?: boolean;
    iconMessage?: string;
}

export const CustomInput = ({
    id,
    label,
    name,
    placeholder,
    value,
    onChange,
    type = "text",
    error = "",
    showIcon = false,
    iconMessage = ""
}: CustomInputProps) => {
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
                className={`rounded-md p-3 w-full text-sm placeholder:text-sm sm:placeholder:text-base 
                    bg-white shadow-[0_4px_10px_rgba(253,215,85,0.6)] focus:outline-none focus:shadow-[0_6px_12px_rgba(253,215,85,0.8)] transition-shadow duration-300
                    ${error ? "border-2 border-red-500" : "border-none"}`}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

            {showIcon && iconMessage && (
                <p className="text-green-600 text-sm mt-1">{iconMessage}</p>
            )}
        </div>
    );
};