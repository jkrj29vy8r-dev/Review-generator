import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
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
        brand: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a4bcfd",
          400: "#8098fb",
          500: "#6172f3",
          600: "#4f56e8",
          700: "#4245d0",
          800: "#373ba8",
          900: "#303584",
          950: "#1e1f52",
        },
        violet: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
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
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(97, 114, 243, 0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(97, 114, 243, 0.5), 0 0 100px rgba(97, 114, 243, 0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-delay": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        "aurora-float": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.1)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float-delay 5s ease-in-out infinite 1s",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "scale-in": "scale-in 0.3s ease-out",
        "gradient-x": "gradient-x 4s ease infinite",
        "aurora-float": "aurora-float 8s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(135deg, #6172f3 0%, #8b5cf6 50%, #a78bfa 100%)",
        "gradient-brand-hover": "linear-gradient(135deg, #4f56e8 0%, #7c3aed 50%, #8b5cf6 100%)",
        "gradient-dark": "linear-gradient(135deg, #0a0a12 0%, #0f0f1a 50%, #12121f 100%)",
        "gradient-aurora": "linear-gradient(135deg, #6172f3 0%, #06b6d4 50%, #8b5cf6 100%)",
        "gradient-sunset": "linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)",
        "gradient-emerald": "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6172f3 100%)",
        "mesh-1": "radial-gradient(at 40% 20%, hsla(237,83%,65%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(270,75%,60%,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(197,85%,60%,0.1) 0px, transparent 50%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(97, 114, 243, 0.3)",
        "glow-md": "0 0 30px rgba(97, 114, 243, 0.35)",
        "glow-lg": "0 0 60px rgba(97, 114, 243, 0.4)",
        "glow-violet": "0 0 30px rgba(139, 92, 246, 0.35)",
        "card-premium": "0 4px 24px -4px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05)",
        "card-hover": "0 20px 60px -10px rgba(97,114,243,0.25), 0 0 0 1px rgba(97,114,243,0.2)",
        "inner-glow": "inset 0 0 30px rgba(97,114,243,0.1)",
        "3d": "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
