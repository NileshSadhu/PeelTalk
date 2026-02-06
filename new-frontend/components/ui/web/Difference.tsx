"use client";

const Difference = () => {
    const pills = [
        "One-on-One Chat",
        "Group Chats",
        "Rapid Matches",
        "Global Community",
        "Seeders",
    ];

    return (
        <>
        <div className="custom-shape-divider-bottom-1769705831">
            <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
            ></path>
            </svg>
        </div>

        <section className="bg-[#FFF872] py-30">
            {/* Content Wrapper */}
            <div className="max-w-5xl mx-auto px-6 text-center">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#653516]">
                Why Peeltalk is different !
            </h2>

            {/* Paragraph */}
            <p className="mt-4 text-[#653516] text-sm md:text-base leading-relaxed">
                Peeltalk is where communities gather to discuss the latest events
                shaping the world. Unlike other platforms where you wait for
                responses, here you talk in real time where thoughts clash and
                solutions are born.
            </p>

            {/* Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
                {pills.map((item, index) => (
                <div
                    key={index}
                    className="
                    bg-white text-[#653516]
                    px-6 py-2 rounded-full
                    text-sm font-medium
                    shadow-md
                    hover:-translate-y-1 transition duration-200
                "
                >
                    {item}
                </div>
                ))}
            </div>
            </div>
        </section>

        <div className="custom-shape-divider-top-1769706322">
            <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            >
            <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
            ></path>
            </svg>
        </div>
        </>
    );
};

export default Difference;
