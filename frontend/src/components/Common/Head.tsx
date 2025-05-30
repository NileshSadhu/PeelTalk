import logo from '../../assets/logo.png'
import { TypingEffect } from './TypingEffect'

export const Head = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 p-4 w-full">
            <img
                src={logo}
                alt="Logo"
                className="w-32 sm:w-40 md:w-48 max-w-[12rem] h-auto object-contain"
            />
            <div className="space-y-2 text-left max-w-full md:max-w-xl">
                <h1 className="balsamiq-sans-bold text-4xl sm:text-5xl md:text-6xl font-bold text-amber-900">
                    PeelTalk
                </h1>
                <TypingEffect />
            </div>
        </div>
    )
}