import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        calendar?: {
            schedulingButton: {
                load: (config: any) => void;
            };
        };
    }
}

interface BookButtonProps {
    label?: string;
    color?: string;
}

export const BookButton: React.FC<BookButtonProps> = ({
    label = 'Book Consultation',
    color = '#000000'
}) => {
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadButton = () => {
            if (window.calendar?.schedulingButton && targetRef.current) {
                targetRef.current.innerHTML = '';

                window.calendar.schedulingButton.load({
                    url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2K1CMy371cWhEF3NcjANXoOv4dBxeoPniNU99iYFI0qrF2NbpjYPg_cabhGphs05n1sPiCHnPa?gv=true',
                    color: color,
                    label: label,
                    target: targetRef.current,
                });
                return true;
            }
            return false;
        };

        if (!loadButton()) {
            const interval = setInterval(() => {
                if (loadButton()) {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }
    }, [label, color]);

    return <div ref={targetRef} className="inline-block" />;
};
