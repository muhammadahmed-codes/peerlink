/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Adjust paths as needed
    theme: {
      extend: {
        colors: {
          border: "#e2e8f0", // Set border color
          ring: "#3b82f6", // Set ring outline color
          background: "#f8fafc",
          foreground: "#1e293b"
        },
      },
    },
    plugins: [],
  };
  