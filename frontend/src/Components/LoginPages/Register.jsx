import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import Title from "../Title";
import ViseVerse from "../ViseVerse";

function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">

                {/* Left: Title Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Title/>
                </div>

                {/* Right: Register Form Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">
                        <h1 className="balsamiq-sans-bold text-2xl sm:text-3xl text-amber-900 mb-2">
                            Let's get you started
                        </h1>
                        <p className="balsamiq-sans-bold text-sm sm:text-base text-amber-900 mb-4">
                            Don't worry, we don't bite. We just chat.
                        </p>
                        <CustomInput id="username" label="Username:" placeholder="uzihiko" />
                        <CustomInput id="email" label="Email:" placeholder="xyz@example.com" />
                        <CustomInput id="password" label="Password:" placeholder="At least 8 characters long" />
                        <CustomButton label="Submit" />
                        <ViseVerse text="Already have an account? Login" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
