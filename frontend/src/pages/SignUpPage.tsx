import { Helmet } from 'react-helmet-async';
import { SignUp } from "../components/AuthComponents/SignUp"

export const SignUpPage = () => {
    return (
        <>
            <Helmet>
                <title>Sign Up – PeelTalk</title>
                <link rel="canonical" href="https://www.peeltalk.live/signUp" />
                <meta name="description" content="Create an account on PeelTalk to meet and chat with new people anonymously." />
            </Helmet>
            <SignUp />
        </>
    )
}