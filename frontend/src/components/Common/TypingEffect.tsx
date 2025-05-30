import { Typewriter } from 'react-simple-typewriter';

export const TypingEffect = () => {
    return (
        <div
            className="balsamiq-sans-regular-italic  font-medium text-base sm:text-lg md:text-xl text-amber-900 break-words whitespace-normal min-h-[4.5rem] md:min-h-[5rem]">
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
    )
}