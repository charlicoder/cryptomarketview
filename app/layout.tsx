
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import StoreProvider from '@/providers/StoreProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import ScrollToTop from '@/components/dashboard/ScrollToTop';

// Configure the font imports
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter', // Assign a CSS variable name
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'CryptoView - AI-Powered Cryptocurrency Tracker',
    description: 'Track cryptocurrency prices with real-time data and advanced analytics',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ScrollToTop />
                <StoreProvider>
                    <ThemeProvider>

                        {children}

                    </ThemeProvider>
                </StoreProvider>
            </body>
        </html>
    )
}