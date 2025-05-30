import { useNavigate } from "react-router-dom";

interface NavigateLinksProps {
    type: "SignIn" | "SignUp";
}

export const NavigateLinks = ({ type }: NavigateLinksProps) => {
    const navigate = useNavigate();

    const isLogin = type === "SignIn";

    return (
        <div className="text-center mt-1.5">
            <button
                onClick={() => navigate(isLogin ? "/SignIn" : "/SignUp")}
                className="balsamiq-sans-bold font-medium text-[12px] text-amber-900"
            >
                {isLogin
                    ? "Already have an account? SignIn"
                    : "Don't have an account? SignUp"}
            </button>
        </div>
    );
};