import typography from "@tailwindcss/typography";

/**
 * Theme tokens — deep navy canvas with violet as the sole accent (links, CTAs, chips, hovers, gradients).
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /** Page background — deep indigo-navy (like the dense overlaps + line weight) */
        canvas: "#0a0f1c",

        /** Panels — slightly lifted indigo slate */
        surface: {
          DEFAULT: "#121a30",
          hover: "#1a2540",
          elevated: "#243154",
        },

        /** Hairlines — cool blue-slate */
        border: {
          DEFAULT: "#2d3d5c",
          muted: "#3d4f6e",
        },

        /** Text — neutral with a cool read on navy */
        ink: {
          DEFAULT: "#f1f5f9",
          muted: "#cbd5e1",
          subtle: "#94a3b8",
          faint: "#64748b",
        },

        /** Links, CTAs, chips, markers, emphasis — violet */
        accent: {
          DEFAULT: "#a78bfa", // violet-400
          hover: "#c4b5fd", // violet-300
          muted: "#ddd6fe", // violet-200
        },

        /** Focus ring */
        focus: "#c4b5fd",
      },

      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.ink.muted"),
            strong: {
              color: theme("colors.accent.DEFAULT"),
              fontWeight: "600",
            },
            b: {
              color: theme("colors.accent.DEFAULT"),
              fontWeight: "600",
            },
            h1: {
              color: theme("colors.ink.DEFAULT"),
            },
            h2: {
              color: theme("colors.ink.DEFAULT"),
              fontWeight: "600",
              letterSpacing: "-0.01em",
            },
            h3: {
              color: theme("colors.ink.DEFAULT"),
            },
            a: {
              color: theme("colors.accent.DEFAULT"),
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.accent.hover"),
              },
            },
            li: {
              color: theme("colors.ink.muted"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
