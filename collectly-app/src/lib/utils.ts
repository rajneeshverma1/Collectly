import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a numeric value into a localized USD currency string format.
 * Example: 1250.5 -> $1,250.50
 * 
 * @param amount - The numeric amount to format
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

/**
 * Formats an ISO string or Date object into a readable medium date format.
 * Example: 2026-05-24T20:00:00.000Z -> May 24, 2026
 * 
 * @param date - The date value to format
 */
export function formatDate(date: string | Date): string {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    }).format(new Date(date));
}
