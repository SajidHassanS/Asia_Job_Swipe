import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        'mobcontainer': '2rem',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        signature: "hsl(var(--signature))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          // DEFAULT: "hsl(var(--primary))",
          DEFAULT: "#0772FF",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: '#0772FF', 
        darkGrey: '#202A4F', 
        lightgrey: '#2C3863', 
        darkBlue: '#060E29', 
        offWhite: '#B6B6B6', 
        offWhiteLight: '#D2D2D2', 
        lightPink: '#F3F1FF', 
        paragraphBlue: '#3D589B', 
        inputGrey: '#9199A3', 
        newGrey: "#B7C3D2",
        lightWhite: "#FAFAFA",
        blackish: "#18191C",
        darktext: "#5E6670",
        suggestion: "#474C54",
        signingrey: "#8F9197",
        signinemail: "#202430",
        signininput: "#515B6F",
        signininput2: "#7C8493",
        signininput3: "#A8ADB7",
        signininput4: "#7C8493",
        modaltext: "#25324B",
        greenprogress: "#56CDAD",
        greenprogressbg: "#EEFAF7",
        switchbg: "#56CDAD1A",
        bglite: "#F8F8FD",
        reviewYellow: "#FFB836",
        processingPurple: "#4640DE",
        hrline: "#D6DDEB",
        yellow: "#FFB836",
        yellowBg: "#EB85331A",
        discordbg: "#5865F2",
        threeicons: "#C8C8C8",
        'custom-dark-blue': 'hsl(var(--custom-dark-blue))',
        'custom-gray-blue': 'hsl(var(--custom-gray-blue))',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        'custom': ['YourFontName', 'sans-serif'], // Ensure the font name matches your @font-face
      },
      fontWeight: {
        'thin': '100',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Make sure the plugin is installed
};

export default config;
