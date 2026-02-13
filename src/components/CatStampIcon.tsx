import React from 'react';

interface CatStampIconProps {
    size?: number;
    className?: string;
}

export const CatStampIcon: React.FC<CatStampIconProps> = ({ size = 24, className = "" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Outer Circle (Stamp Border) */}
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="3" fill="none" />

            {/* Cat Face Outline */}
            <path d="M25 40 L20 25 L35 30 C40 28 60 28 65 30 L80 25 L75 40 C80 50 80 70 75 80 C70 90 30 90 25 80 C20 70 20 50 25 40 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />

            {/* Eyes */}
            <circle cx="35" cy="55" r="3" fill="currentColor" />
            <circle cx="65" cy="55" r="3" fill="currentColor" />

            {/* Nose & Mouth */}
            <path d="M48 65 L52 65 L50 68 Z" fill="currentColor" />
            <path d="M50 68 Q45 75 40 70" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M50 68 Q55 75 60 70" stroke="currentColor" strokeWidth="2" fill="none" />

            {/* Whiskers */}
            <line x1="20" y1="55" x2="30" y2="58" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="62" x2="30" y2="62" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="55" x2="70" y2="58" stroke="currentColor" strokeWidth="2" />
            <line x1="80" y1="62" x2="70" y2="62" stroke="currentColor" strokeWidth="2" />

            {/* Text (Optional, small "OK" or similar) */}
            <text x="50" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor" className="select-none">OK</text>
        </svg>
    );
};
