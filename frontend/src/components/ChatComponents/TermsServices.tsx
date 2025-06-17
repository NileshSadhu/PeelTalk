import { useState } from "react";

export const TermsServices = () => {
    const [showTerms, setShowTerms] = useState(false);
    const handleToggle = () => setShowTerms(!showTerms);

    return (
        <>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-10 sm:mt-3">
                <button
                    onClick={handleToggle}
                    className="text-[11px] sm:text-xs text-[#4B2E1E]/70 hover:text-[#4B2E1E] transition-colors"
                >
                    Terms & Services
                </button>
            </div>

            {showTerms && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3 sm:px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg sm:max-w-2xl p-4 sm:p-6 overflow-y-auto max-h-[85vh]">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#4B2E1E] text-center">
                            Terms and Conditions
                        </h2>

                        <div className="text-xs sm:text-sm text-gray-700 space-y-3 leading-relaxed">
                            <p><strong>1. Service Description:</strong> PeelTalk is an anonymous chat platform that randomly connects users for one-on-one conversations.</p>
                            <p><strong>2. Account Requirement:</strong> Users must create an account using details such as username, first name, last name, age, gender, and a profile photo.</p>
                            <p><strong>3. Data Storage:</strong> PeelTalk does not store chat data for more than one week. All messages are automatically deleted after 7 days.</p>
                            <p><strong>4. Encryption:</strong> All chats are end-to-end encrypted to ensure user privacy and security.</p>
                            <p><strong>5. Public Information:</strong> Users can only see the username and profile photo of the person they are chatting with.</p>
                            <p><strong>6. Age Restriction:</strong> PeelTalk is intended for users aged 13 and above. By using the app, you confirm you meet this requirement.</p>
                            <p><strong>7. Personal Safety:</strong> Users are advised not to share personal details. PeelTalk is not responsible for any personal information disclosed during chats.</p>
                            <p><strong>8. Reporting & Blocking:</strong> A feature to report or block users is coming in future updates. In the meantime, contact support at <a href="mailto:banana.chat.app@gmail.com" className="text-blue-600 underline">peeltalkchat@gmail.com</a>.</p>
                            <p><strong>9. Free Usage:</strong> PeelTalk is a free service. There are no hidden charges.</p>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                onClick={handleToggle}
                                className="bg-yellow-400 hover:bg-yellow-500 text-[#4B2E1E] text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
