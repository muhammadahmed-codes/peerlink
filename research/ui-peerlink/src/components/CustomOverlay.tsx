'use client';

import { useEffect } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function CustomOverlay({ onClose, type }: any) {

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === "overlay") {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    return (
        <div 
            id="overlay"
            className="fixed inset-0 flex items-center justify-center bg-white/80 transition-all duration-300 z-50"
            onClick={handleBackgroundClick} 
        >
            { type == 'login' ? <SignInForm /> : <SignUpForm/> }
            
        </div>
    );
}