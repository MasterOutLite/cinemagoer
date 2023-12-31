import Main from "@/layout";
import ThemeRegistry from "@/styles/ThemeRegistry/ThemeRegistry";
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
        <ThemeRegistry>
            <body>
            <Main>
                {children}
            </Main>
            </body>
        </ThemeRegistry>
        </html>
    )
}
