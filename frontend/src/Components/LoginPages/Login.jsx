import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import Title from "../Title";
import ViseVerse from "../ViseVerse";

function Login() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">

                {/* Left: Title Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Title text="Banana - because talking to strangers is more fun than talking to your plants." />
                </div>

                {/* Right: Login Box */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">
                        <h1 className="balsamiq-sans-bold text-2xl sm:text-3xl text-amber-900 mb-2">
                            Welcome Back!
                        </h1>
                        <p className="balsamiq-sans-bold text-sm sm:text-base text-amber-900 mb-4">
                            Back for more Bananas? We got you
                        </p>
                        <CustomInput label="Email:" placeholder="xyz@example.com" />
                        <CustomInput label="Password:" placeholder="At least 8 characters long" />
                        <CustomButton label="Submit" />
                        <ViseVerse text="Don't have an account? Register" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
