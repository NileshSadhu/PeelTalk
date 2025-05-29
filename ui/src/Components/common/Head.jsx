function Head({ title, tagline }) {
    return (
        <>
            <h1 className="balsamiq-sans-bold text-2xl sm:text-3xl text-amber-900 mb-2">
                {title}
            </h1>
            <p className="balsamiq-sans-regular-italic  text-xs text-amber-900 mb-4">
                {tagline}
            </p>
        </>
    )
}

export default Head;