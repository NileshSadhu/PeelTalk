"use client";
import { useState } from "react";

const faqData = [
    {
        question: "Is Peeltalk free to use?",
        answer:
        "Yes! Peeltalk is completely free to join and chat with other Peelsters worldwide.",
    },
    {
        question: "Do I need to create an account?",
        answer:
        "No long sign-ups. Just pick a nickname and start talking instantly.",
    },
    {
        question: "Can I join group chats?",
        answer:
        "Absolutely! Join live ChatPits and jump into ongoing conversations.",
    },
    {
        question: "Are chats anonymous?",
        answer: "Yes. Your identity stays private unless you choose to share.",
    },
    ];

    export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#653516]">
            Frequently Asked Questions
            </h2>

            {/* FAQ List */}
            <div className="mt-10 space-y-4">
            {faqData.map((item, index) => (
                <div
                key={index}
                className="border border-[#653516]/20 faq-card rounded-xl overflow-hidden"
                >
                {/* Question */}
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                    <span className="font-medium text-[#653516]">
                    {item.question}
                    </span>

                    {/* Icon */}
                    <span className="text-2xl font-bold text-[#653516]">
                    {activeIndex === index ? "×" : "+"}
                    </span>
                </button>

                {/* Answer */}
                <div
                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index
                        ? "max-h-40 py-4 opacity-100"
                        : "max-h-0 py-0 opacity-0"
                    }`}
                >
                    <p className="text-[#653516] text-sm">{item.answer}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
