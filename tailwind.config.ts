import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        'bounce-in': {
          '0%': { transform: 'translateY(-500px)', opacity: '0' },
          '40%': { transform: 'translateY(25px)', opacity: '0.8' },
          '70%': { transform: 'translateY(-10px)', opacity: '0.9' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
