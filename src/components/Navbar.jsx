import dayjs from 'dayjs';
import { Moon, Sun } from "lucide-react";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window.js";
import { Tooltip } from "react-tooltip";

const Navbar = ({ onToggleTheme, theme }) => {
    const { openWindow } = useWindowStore();

    const openFromClick = (event, windowKey) => {
        const rect = event.currentTarget.getBoundingClientRect();
        openWindow(windowKey, null, {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
        });
    };

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">LesOS Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={(event) => openFromClick(event, type)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    {navIcons.map(({ id, img }) => {
                        const isThemeToggle = img.includes("mode.svg");

                        return (
                            <li
                                key={id}
                                onClick={isThemeToggle ? onToggleTheme : undefined}
                                title={isThemeToggle ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : undefined}
                                aria-label={isThemeToggle ? "Toggle theme" : undefined}
                                className={isThemeToggle ? "cursor-pointer p-1 rounded hover:bg-gray-200/70 transition-colors" : ""}
                            >
                                {isThemeToggle ? (
                                    theme === "light"
                                        ? <Moon className="w-4 h-4 text-black/80" />
                                        : <Sun className="w-4 h-4 text-amber-300" />
                                ) : (
                                    <img src={img} className="icon-hover" alt={`icon-${img}`} />
                                )}
                            </li>
                        );
                    })}
                </ul>

                <Tooltip id="theme-toggle-tooltip" className="app-tooltip" place="bottom" offset={8} />
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    );
};

export default Navbar;