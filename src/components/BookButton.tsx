import React from 'react';
import { twMerge } from 'tailwind-merge';

interface BookButtonProps {
    label?: string;
    className?: string;
    color?: string;
}

export const BookButton: React.FC<BookButtonProps> = ({
    label = 'Book Consultation',
    className,
    color
}) => {
    return (
        <a
            href="https://calendar.app.google/jcY3JgK9YACJ3SA5A"
            target="_blank"
            rel="noopener noreferrer"
            className={twMerge(
                "inline-flex items-center justify-center font-bold text-white bg-black rounded-full border border-transparent hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-sm group px-6 py-3 text-sm",
                className
            )}
            style={color ? { backgroundColor: color } : undefined}
        >
            {label}
        </a>
    );
};
