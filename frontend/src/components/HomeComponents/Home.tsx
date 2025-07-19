


export const Home = () => {
    return (
        <div>
            <span className="text-2xl flex justify-center font-bold">Landing Page</span>
            <div className="flex flex-col items-center justify-center h-screen">
            <button className="p-2 text-black border bg-orange-400" onClick={() => {window.location.href = '/chat'}}>Go toChat</button>
            <button className="p-2 text-black border bg-orange-400" onClick={() => {window.location.href = '/groupchat'}}>Go to GroupChat</button>
            </div>
        </div>
    )
}