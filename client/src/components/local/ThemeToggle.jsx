import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 border"
    >
      {theme === "light" ? (
        <Moon size={18} className="text-slate-700 transition-all" />
      ) : (
        <Sun size={18} className="text-yellow-400 transition-all" />
      )}
    </Button>
  );
};