import logo from '../assets/logo.png';
import { Typewriter } from 'react-simple-typewriter';

function Title() {
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
                <div className="balsamiq-sans-regular-italic  font-medium text-base sm:text-lg md:text-xl text-amber-900 break-words whitespace-normal min-h-[4.5rem] md:min-h-[5rem]">
                    {/* Replace static text with typewriter */}
                    <Typewriter
                        words={[
                            'Why ? because talking to strangers is more fun than talking to your plants.',
                            'Slip into random chats and unexpected friendships.',
                            'Sweet chat, Zero awkward peels.',
                            'Bananas are not a tree, but a very big herb!'
                        ]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </div>
            </div>
        </div>
    );
}

export default Title;
