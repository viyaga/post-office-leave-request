'use client'

export default function GlobalError({ error }) {
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
                <button
                    style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        marginTop: '5px'

                    }}
                    onClick={() => location.reload()}
                >
                    Try after {error.message.toLowerCase() === 'connection closed.' ? "60 seconds" : "some times"}
                </button>
            </body>
        </html>
    )
}