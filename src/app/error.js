'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body style={{ color: 'white' }}>
                <h2>Something went wrong!</h2>
                <p>{error?.message}</p>
                <button onClick={() => reset()}>Try after 60 seconds</button>
            </body>
        </html>
    )
}