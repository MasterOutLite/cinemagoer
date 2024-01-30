"use client"
import React from "react";
import Header from "@/layout/Header";

export interface MainProps {
    children: React.ReactNode
}

export default function Main({children}: MainProps) {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
        </>
    );
}
