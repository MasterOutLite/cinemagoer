import Main from "@/layout";
import '@/styles/globals.css'

export const metadata = {
    title: 'Animon',
    description: 'Generated by Next.js',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <Main>
            {children}
        </Main>
        </body>
        </html>
    )
}
