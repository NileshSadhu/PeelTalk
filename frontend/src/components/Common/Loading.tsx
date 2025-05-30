import { OrbitProgress } from "react-loading-indicators"

export const Loading = () => {
    return (
        <div className="loading-container">
            <OrbitProgress 
                variant="split-disc" 
                color="#ffe048" 
                size="medium" 
                text="" 
                textColor="" 
            />
        </div>
    )
}