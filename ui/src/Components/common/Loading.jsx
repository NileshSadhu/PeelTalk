function Loading() {
    return (
        <div className="flex justify-center items-center min-h-[200px] w-full">
            <div className="flex gap-2.5">
                <div className="h-5 w-5 rounded-full bg-[linear-gradient(#222_0_0)_top/100%_40%_no-repeat,radial-gradient(farthest-side,#000_95%,#0000)_50%/8px_8px_no-repeat_#fff] animate-bounce-slow origin-bottom" />
                <div className="h-5 w-5 rounded-full bg-[linear-gradient(#222_0_0)_top/100%_40%_no-repeat,radial-gradient(farthest-side,#000_95%,#0000)_50%/8px_8px_no-repeat_#fff] animate-bounce-slow origin-bottom delay-100" />
            </div>
        </div>
    );
}

export default Loading;