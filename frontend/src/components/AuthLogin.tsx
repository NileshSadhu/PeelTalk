import toast from "react-hot-toast"
import { handleLogin } from "../api/auth"
import { useNavigate } from "react-router-dom"
import { useState } from "react"



export const AuthLogin = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const notify = ()=>{
        toast.success("Successful!!!!") // toast notification usage sample
    }

    const Login = async()=>{
        const result = await handleLogin(email,password)
        if(result?.success){
            navigate(result.next)
        }
    }

    return(
        <div className="text-2xl font-bold">
            Login Page Content
            <button onClick={notify}>
                Notify
            </button>
            <div>
                <button onClick={Login}>Login</button>
            </div>
        </div>
    )
}