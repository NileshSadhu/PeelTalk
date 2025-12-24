"use client"
import { CustomInput } from "@/components/inputbox";


export default function Signin() {
    return(
        <div className="font-bold text-2xl text-center">
            SignIn Page
            <div>
                <CustomInput id={"email"} label={"Email"} name={"email"} placeholder={"Enter your email"} value={""} onChange={function (value: string): void {
                    throw new Error("Function not implemented.");
                } }/>
            </div>
        </div>
    )
}