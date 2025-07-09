import { Helmet } from "react-helmet-async"
import Home from "../components/HomeComponents/Home"


export const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>PeelTalk – Meet New People Instantly</title>
                <link rel="canonical" href="https://www.peeltalk.live/" />
                <meta 
                    name="description" 
                    content="PeelTalk is a random chat platform that connects you instantly with new people for anonymous conversations. Start chatting now!" 
                />
                <meta name="robots" content="index, follow" />

                <script type="application/ld+json">
                {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "PeelTalk",
                "url": "https://www.peeltalk.live",
                "logo": "https://www.peeltalk.live/og-image.png",
                "sameAs": [
                    "https://www.producthunt.com/products/peeltalk",
                    "https://x.com/PeelTalk",
                    "https://www.instagram.com/peeltalkchat/"
                ]
                })}
                </script>
            </Helmet>
            <Home />
        </div>
    )
}