import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";
import Head from "../common/head";
import Title from "../common/Title";
import ViseVerse from "../common/ViseVerse";

function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100 flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0">

                {/* Left: Title Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <Title />
                </div>

                {/* Right: Register Form Section */}
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md shadow-md">

                        <Head
                            title={"Welcome Back!"}
                            tagline={"Back for more Bananas? We got you"}
                        />

                        {/* User field */}
                        <CustomInput id="username" label="Username:" placeholder="uzihiko" />

                        {/* email field */}
                        <CustomInput id="email" label="Email:" placeholder="xyz@example.com" />

                        {/* password field */}
                        <CustomInput id="password" label="Password:" placeholder="At least 8 characters long" />

                        {/* btn */}
                        <CustomButton label="Submit" />

                        <ViseVerse text="Already have an account? Login" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
