import { Helmet } from "react-helmet-async";
import { SignIn } from "../components/AuthComponents/SignIn"

export const SignInPage = () => {
    return (
        <>
            <Helmet>
                <title>Sign In – PeelTalk</title>
                <link rel="canonical" href="https://www.peeltalk.live/signIn" />
                <meta name="description" content="Log in to PeelTalk to chat with people anonymously and securely." />
            </Helmet>
            <SignIn />
        </>
    );
}