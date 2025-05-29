import { useNavigate } from "react-router-dom";

function ViseVerse({ type }) {
    const navigate = useNavigate();

    const isLogin = type === "login";

    return (
        <div className="text-center mt-1.5">
            <button
                onClick={() => navigate(isLogin ? "/login" : "/register")}
                className="balsamiq-sans-bold font-medium text-[12px] text-amber-900"
            >
                {isLogin
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
            </button>
        </div>
    );
}

export default ViseVerse;