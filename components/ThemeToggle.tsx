"use client";

import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

type Theme = "winter" | "dracula";
const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("winter");
  const handleToggleTheme = () => {
    const newTheme = theme === "winter" ? "dracula" : "winter";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button className="btn btn-primary btn-outline" onClick={handleToggleTheme}>
      {theme === "winter" ? (
        <BsMoonFill className="h-4 w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
