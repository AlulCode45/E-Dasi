import { HTMLAttributes, ReactNode } from "react";

interface Card {
    title: string;
    icon: ReactNode;
    count: number;
    color: string;
    unit: string;
}

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    card: Card;
}

// Utility function to map color names to Tailwind classes
const getColorClass = (color: string): string => {
    const colorClasses: { [key: string]: string } = {
        blue: 'border-blue-400',
        red: 'border-red-400',
        yellow: 'border-yellow-400'
    };

    return colorClasses[color] || 'border-gray-400'; // Default to gray if color not found
};

export default function CardHeader({ card, ...props }: CardHeaderProps) {
    const borderColorClass = getColorClass(card.color);

    return (
        <div {...props} className={`bg-white border-b-4 ${borderColorClass} rounded-md shadow p-7`}>
            <span className="text-gray-500 text-sm uppercase font-semibold">{card.title}</span>
            <div className="flex justify-between mt-3">
                <div className="flex items-center gap-2">
                    {card.icon}
                    <b className="text-4xl">{card.count} <span className="text-gray-500 text-xl">{card.unit}</span></b>
                </div>
            </div>
        </div>
    );
}
