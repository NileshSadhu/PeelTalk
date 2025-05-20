import { Typewriter } from 'react-simple-typewriter'
import logo from '../assets/logo.png'

function Title() {
    return (
        <div className="flex items-center space-x-6 p-4">
            <img src={logo} alt="Logo" className="w-48 h-48 object-contain" />
            <div className="space-y-1 text-left w-lg">
                <h1 className="balsamiq-sans-bold text-6xl font-bold text-amber-900">Banana</h1>
                <p className="balsamiq-sans-bold font-medium text-xl text-amber-900">
                    Banana - 
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
