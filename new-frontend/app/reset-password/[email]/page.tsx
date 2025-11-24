"use client"

import { useParams } from "next/navigation"



export default function ResetPassword() {
    const { email } = useParams();

    return(
        <div>
            Reset Password {email}
        </div>
    )
}