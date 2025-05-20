import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import Title from "../Title";
import ViseVerse from "../ViseVerse";

function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100 flex items-center justify-center p-6">
            <div className="flex items-center space-x-8">
                <Title />
                <div className="bg-white p-10 rounded-tr-lg rounded-br-lg rounded-bl-lg w-lg">
                    <h1 className="balsamiq-sans-bold text-3xl text-amber-900">
                        Let's get you started
                    </h1>
                    <p className="balsamiq-sans-bold text-xs text-amber-900">Don't worry, we don't bite. We just chat.</p>
                    <CustomInput label="Username:" placeholder="uzihiko" />
                    <CustomInput label="Email:" placeholder="xyz@example.com" />
                    <CustomInput label="Password:" placeholder="At least 8 character long" />
                    <CustomButton label="Submit" />
                    <ViseVerse text="Already have an account ! Login"/>
                </div>
            </div>
        </div>
    )
}

export default Register;