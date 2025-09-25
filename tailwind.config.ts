// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    // darkMode: "class" is good for controlling theme with a class on the <html> or <body>
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}', // Crucial for App Router
        './src/**/*.{js,jsx}', // Add any other relevant directories
    ],
    prefix: "", // Keep or remove based on your preference; it adds a prefix to all generated classes
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // This is the crucial part for mapping your CSS variables
            // Tailwind v4 expects color names to be resolvable.
            // By defining them here, you tell Tailwind that `bg-background` should map to `var(--color-background)`.
            colors: {
                // --- Mapping your CSS variables to Tailwind's color palette ---
                border: "var(--color-border)",
                input: "var(--color-input)",
                ring: "var(--color-ring)",
                background: "var(--color-background)",
                foreground: "var(--color-foreground)",

                primary: {
                    DEFAULT: "var(--color-primary)",
                    foreground: "var(--color-primary-foreground)",
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    foreground: "var(--color-secondary-foreground)",
                },
                destructive: {
                    DEFAULT: "var(--color-destructive)",
                    foreground: "var(--color-destructive-foreground)",
                },
                muted: {
                    DEFAULT: "var(--color-muted)",
                    foreground: "var(--color-muted-foreground)",
                },
                accent: {
                    DEFAULT: "var(--color-accent)",
                    foreground: "var(--color-accent-foreground)",
                },
                popover: {
                    DEFAULT: "var(--color-popover)",
                    foreground: "var(--color-popover-foreground)",
                },
                card: {
                    DEFAULT: "var(--color-card)",
                    foreground: "var(--color-card-foreground)",
                },
                success: {
                    DEFAULT: "var(--color-success)",
                    foreground: "var(--color-success-foreground)",
                },
                warning: {
                    DEFAULT: "var(--color-warning)",
                    foreground: "var(--color-warning-foreground)",
                },
                error: {
                    DEFAULT: "var(--color-error)",
                    foreground: "var(--color-error-foreground)",
                },
            },
            // Map your font families using CSS variables (from layout.tsx)
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'], // This is good if Inter is the default
                // If using 'variable: --font-inter' in next/font, you should use:
                // sans: ['var(--font-inter)', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'], // Same here for mono
                // If using 'variable: --font-jetbrains-mono' in next/font, you should use:
                // mono: ['var(--font-jetbrains-mono)', 'monospace'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1rem' }],
                'sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'base': ['1rem', { lineHeight: '1.5rem' }],
                'lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'xl': ['1.25rem', { lineHeight: '1.75rem' }],
                '2xl': ['1.5rem', { lineHeight: '2rem' }],
                '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
                '5xl': ['3rem', { lineHeight: '1' }],
                '6xl': ['3.75rem', { lineHeight: '1' }],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
            },
            backdropBlur: {
                xs: '2px',
                '3xl': '64px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'elevation-1': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'elevation-4': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.3s ease-out",
                "slide-in": "slide-in 0.3s ease-out",
                "scale-in": "scale-in 0.2s ease-out",
                "spring": "spring 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
                "slide-in": {
                    from: { transform: "translateY(-10px)", opacity: "0" },
                    to: { transform: "translateY(0)", opacity: "1" },
                },
                "scale-in": {
                    from: { transform: "scale(0.95)", opacity: "0" },
                    to: { transform: "scale(1)", opacity: "1" },
                },
                "spring": {
                    "0%": { transform: "scale(0.95)", opacity: "0" },
                    "50%": { transform: "scale(1.02)" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [
        // --- CORRECT PLUGIN IMPORT FOR TAILWIND v4 and above ---
        // Use require('@tailwindcss/forms') if you installed it separately.
        // If it's a built-in plugin or managed differently, adjust accordingly.
        // For most cases, installing it separately and requiring it is the way.
        require('@tailwindcss/forms'), // Make sure you've installed it: npm install @tailwindcss/forms --save-dev
        require("tailwindcss-animate"), // This one is usually fine as imported.

        // If you have custom plugins, define them here or use require()
        // Example:
        // plugin(function({ addComponents, theme }) { ... })
    ],
};
