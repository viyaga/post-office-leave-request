'use client'

export default function GlobalError({ error, reset }) {
    return (
        <html>
            <body
                style={{
                    color: "white",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px"
                }}>
                <h2>Something went wrong!</h2>
                <p>{error?.message}</p>
                <button onClick={() => reset()}>Try after 60 seconds</button>
            </body>
        </html>
    )
}