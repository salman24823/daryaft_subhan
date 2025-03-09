import { heroui } from "@heroui/react";
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		animation: {
  			'infinite-scroll': 'infinite-scroll 25s linear infinite',
  			fadeInUp: 'fadeInUp 0.5s ease-out forwards'
  		},
  		keyframes: {
  			'infinite-scroll': {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			}
  		},
  		colors: {
  			'primary': '#e9bc95',
  			'secondary': '#a8744a',
  			'neutral': '#f8f3f3',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    daisyui,
    heroui(),
      require("tailwindcss-animate")
],
  // daisyui: {
  //   themes: [
  //     {
  //       textileLightTheme: {
  //         "primary": "#10336f",  // bg primary
  //         "secondary": "#06214e",  // bg hover
  //         "accent": "#2962ff",  // link hover
  //         "neutral": "#f9fdff",   //  body bg
  //         "textPrimary": "#ebebeb", // text 1
  //         "textSecondary": "#676565", // text 2
  //         "base-100": "#ffff", //  color 1 
  //         "base-200": "#444746", // link color 
  //         "info": "#62B6CB",
  //         "success": "#4CAF50",
  //         "warning": "#FF9800",
  //         "error": "#F44336",
  //       },
  //     },
  //     {
  //       textileDarkTheme: {
  //         "primary": "#021212",  // bg primary
  //         "secondary": "#092924",  // bg hover
  //         "accent": "#ffff",  // link hover
  //         "neutral": "#051f20",   //  body bg
  //         "textPrimary": "#d1aa4f", // text 1
  //         "textSecondary": "#e0d3a9", // text 2
  //         "base-100": "#ffff", //  color 1 
  //         "base-200": "#444746", // link color 
  //         "info": "#62B6CB",
  //         "success": "#4CAF50",
  //         "warning": "#FF9800",
  //         "error": "#F44336",
  //       },
  //     }
  //   ],
  // },
};

export default config;
