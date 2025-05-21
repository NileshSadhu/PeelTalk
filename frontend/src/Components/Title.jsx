import { Typewriter } from 'react-simple-typewriter';
import logo from '../assets/logo.png';

function Title() {
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 p-4 w-full">
            <img src={logo} alt="Logo" className="w-32 sm:w-40 md:w-48 h-auto object-contain" />
            <div className="space-y-2 text-center md:text-left w-full">
                <h1 className="balsamiq-sans-bold text-4xl sm:text-5xl md:text-6xl font-bold text-amber-900">Banana</h1>
                <p className="balsamiq-sans-bold font-medium text-base sm:text-lg md:text-xl text-amber-900">
                    Banana -{" "}
                    <Typewriter
                        words={[
                            ' because talking to strangers is more fun than talking to your plants.',
                            ' Slip into random chats and unexpected friendships.',
                        ]}
                        loop={5}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </p>
            </div>
        </div>
    );
}

export default Title;
