import React from 'react';

interface CatStampIconProps {
    size?: number;
    className?: string;
    variant?: 'default' | 'bronze' | 'silver' | 'gold';
}

export const CatStampIcon: React.FC<CatStampIconProps> = ({ size = 24, className = "", variant = 'default' }) => {
    let colors = {
        stroke: "currentColor",
        fill: "currentColor",
        opacity: 0.1
    };

    if (variant === 'bronze') {
        colors = { stroke: "#CD7F32", fill: "#CD7F32", opacity: 0.2 };
    } else if (variant === 'silver') {
        colors = { stroke: "#C0C0C0", fill: "#C0C0C0", opacity: 0.2 };
    } else if (variant === 'gold') {
        colors = { stroke: "#FFD700", fill: "#FFD700", opacity: 0.3 };
    }

    // If className sets color (text-...), currentColor uses that.
    // If variant is set, we might want to override className's color for the svg content if we want strict colors,
    // but allowing className to control is more flexible if 'default'.
    // For specific metals, we probably want hardcoded hex values or specific classes.

    const strokeColor = variant === 'default' ? "currentColor" : colors.stroke;
    const fillColor = variant === 'default' ? "currentColor" : colors.fill;

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
            <circle cx="50" cy="50" r="45" stroke={strokeColor} strokeWidth="3" fill="none" />

            {/* Cat Face Outline */}
            <path d="M25 40 L20 25 L35 30 C40 28 60 28 65 30 L80 25 L75 40 C80 50 80 70 75 80 C70 90 30 90 25 80 C20 70 20 50 25 40 Z"
                stroke={strokeColor} strokeWidth="3" fill={fillColor} fillOpacity={colors.opacity} />

            {/* Eyes */}
            <circle cx="35" cy="55" r="3" fill={strokeColor} />
            <circle cx="65" cy="55" r="3" fill={strokeColor} />

            {/* Nose & Mouth */}
            <path d="M48 65 L52 65 L50 68 Z" fill={strokeColor} />
            <path d="M50 68 Q45 75 40 70" stroke={strokeColor} strokeWidth="2" fill="none" />
            <path d="M50 68 Q55 75 60 70" stroke={strokeColor} strokeWidth="2" fill="none" />

            {/* Whiskers */}
            <line x1="20" y1="55" x2="30" y2="58" stroke={strokeColor} strokeWidth="2" />
            <line x1="20" y1="62" x2="30" y2="62" stroke={strokeColor} strokeWidth="2" />
            <line x1="80" y1="55" x2="70" y2="58" stroke={strokeColor} strokeWidth="2" />
            <line x1="80" y1="62" x2="70" y2="62" stroke={strokeColor} strokeWidth="2" />

            {/* Text (Optional, small "OK" or similar) */}
            <text x="50" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill={strokeColor} className="select-none">OK</text>

            {/* Crown for Gold */}
            {variant === 'gold' && (
                <path d="M35 25 L25 10 L45 20 L50 5 L55 20 L75 10 L65 25" fill="#FFD700" stroke="#DAA520" strokeWidth="1" />
            )}
        </svg>
    );
};
