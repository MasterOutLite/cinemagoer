import React from "react";
import Header from "@/layout/Header";
import ThemeRegistry from "@/styles/ThemeRegistry/ThemeRegistry";

export interface MainProps {
    children: React.ReactNode
}

export default function Main({children}: MainProps) {
    return (
        <ThemeRegistry>
            <Header/>
            <main>
                {children}
            </main>
        </ThemeRegistry>
    );
}
