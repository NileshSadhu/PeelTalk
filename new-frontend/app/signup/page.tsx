import { AuthBranding } from "@/components/auth/AuthBranding";
import SignupForm from "@/components/auth/SignupFom";



export default function Signup() {
    return(
        <div className="min-h-screen bg-linear-to-b from-yellow-200 to-yellow-100 flex items-center justify-center p-4" >
            <div className="flex flex-col md:flex-row items-center md:items-stretch w-full max-w-7xl min-w-0" >
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <AuthBranding/>
                </div>
        
                <div className="flex justify-center items-center w-full md:w-1/2">
                    <div className="bg-white p-6 sm:p-10 rounded-lg w-full max-w-md">
                        <SignupForm/>
                    </div>
                </div>
        
            </div>
        </div>
    )
}