import { useEffect, useState } from "react";

const getPreferredTheme = () => {
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function useTheme() {
    const [theme, setTheme] = useState(getPreferredTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemThemeChange = (event) => {
            const hasManualTheme = localStorage.getItem("theme");
            if (hasManualTheme !== "light" && hasManualTheme !== "dark") {
                setTheme(event.matches ? "dark" : "light");
            }
        };

        media.addEventListener("change", handleSystemThemeChange);
        return () => media.removeEventListener("change", handleSystemThemeChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { theme, setTheme, toggleTheme };
}