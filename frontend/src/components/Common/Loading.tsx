import { OrbitProgress } from "react-loading-indicators"

export const Loading = () => {
    return (
        // bg-gradient-to-b from-yellow-200 to-yellow-100
        <div className="loading-container">
            <div className="flex flex-col items-center">
                <OrbitProgress 
                    variant="split-disc" 
                    color="#ffe048" 
                    size="large" 
                    text="" 
                    textColor="" 
                />
                <p className="balsamiq-sans-regular text-amber-900 mt-4">Loading...</p>
            </div>
        </div>
    )
}