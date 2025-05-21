import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import Title from "../Title";
import ViseVerse from "../ViseVerse";

function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-6 md:space-y-0 w-full max-w-5xl">
                <div className="flex justify-center">
                    <Title />
                </div>
                <div className="bg-white p-6 sm:p-10 rounded-lg w-full md:w-2/3 lg:w-1/2">
                    <h1 className="balsamiq-sans-bold text-2xl sm:text-3xl text-amber-900 mb-2">
                        Let's get you started
                    </h1>
                    <p className="balsamiq-sans-bold text-sm sm:text-xs text-amber-900 mb-4">
                        Don't worry, we don't bite. We just chat.
                    </p>
                    <CustomInput label="Username:" placeholder="uzihiko" />
                    <CustomInput label="Email:" placeholder="xyz@example.com" />
                    <CustomInput label="Password:" placeholder="At least 8 character long" />
                    <CustomButton label="Submit" />
                    <ViseVerse text="Already have an account! Login" />
                </div>
            </div>
        </div>
    );
}

export default Register;
