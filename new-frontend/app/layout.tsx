import type { Metadata } from "next";
import { Balsamiq_Sans } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

const balsamiq = Balsamiq_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-balsamiq",
});

export const metadata: Metadata = {
  title: "PeelTalk – Anonymous Chat with Strangers Worldwide",
  description:
    "PeelTalk is a secure random chat app where you can sign up and connect anonymously with real people worldwide. One-on-one, private conversations with strangers made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={balsamiq.className}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
