/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../src/pages/**/*.{js,ts,jsx,tsx}",
    "../src/components/**/*.{js,ts,jsx,tsx}",
    "./content/**/**/*.md" // pour inclure les fichiers Markdown si nécessaire
  ],
  theme: {
    extend: {
      colors: {
        beige: "#FAF4EB",
        fonce: "#2E2A26",
        accent: "#B74E22",
        accentClair: "#f4e9dd",
        accentBordure: "#e0d4c4"
      },
      fontFamily: {
        serif: ['var(--font-merriweather)', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.fonce"),
            a: {
              color: theme("colors.accent"),
              textDecoration: "underline",
              "&:hover": {
                color: theme("colors.accent"),
              },
            },
            h2: {
              color: theme("colors.accent"),
              fontWeight: "600",
              marginTop: "2.5rem",
            },
            h3: {
              color: theme("colors.accent"),
              fontWeight: "600",
              marginTop: "2rem",
            },
            h4: {
              color: theme("colors.accent"),
              fontWeight: "600",
              marginTop: "1.5rem",
            },
            p: {
              marginTop: "1rem",
              marginBottom: "1rem",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
