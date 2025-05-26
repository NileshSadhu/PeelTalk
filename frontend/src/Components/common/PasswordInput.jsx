import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ placeholder, name, value, onChange, id, error }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="mb-3 relative">
            <input
                id={id}
                type={showPassword ? "text" : "password"}
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

            {/* Toggle visibility icon */}
            <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
        </div>
    );
}

export default PasswordInput;
