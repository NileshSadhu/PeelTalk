function CustomButton({ label, type = "submit", onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full px-4 sm:px-6 py-2 my-2 mb-1 mt-2 bg-amber-900 text-white rounded-md shadow-md hover:bg-amber-800 transition duration-200">
            {label}
        </button>
    );
}

export default CustomButton;
