import dayjs from 'dayjs';
import { Moon, Sun, Wifi, Volume2, Bluetooth, Sun as Brightness } from "lucide-react";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window.js";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const Navbar = ({ onToggleTheme, theme }) => {
    const { openWindow } = useWindowStore();
    const [activeDropdown, setActiveDropdown] = useState(null);

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
                                className={isThemeToggle ? "cursor-pointer p-1 rounded hover:bg-gray-200/70 transition-colors" : "cursor-pointer p-1 rounded hover:bg-gray-200/70 transition-colors relative"}
                            >
                                {isThemeToggle ? (
                                    theme === "light"
                                        ? <Moon className="w-4 h-4 text-black/80" />
                                        : <Sun className="w-4 h-4 text-amber-300" />
                                ) : (
                                    <img src={img} className="icon-hover cursor-pointer" alt={`icon-${img}`} onClick={() => setActiveDropdown(activeDropdown === id ? null : id)} />
                                )}
                                <div className={`absolute top-full mt-1 right-0 bg-white/20 dark:bg-gray-800/70 border border-gray-300/50 dark:border-gray-600/50 rounded-lg shadow-lg p-4 w-64 z-50 transition-all duration-200 ${activeDropdown === id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                                    <div className="flex flex-col space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                                <Wifi className="w-5 h-5 text-blue-500" />
                                                <span className="text-sm">Wi-Fi</span>
                                                <div className="w-8 h-4 bg-green-500 rounded-full"></div>
                                            </div>
                                            <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                                <Bluetooth className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm">Bluetooth</span>
                                                <div className="w-8 h-4 bg-gray-300 rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                            <Volume2 className="w-5 h-5 text-gray-500" />
                                            <span className="text-sm">Volume</span>
                                            <input type="range" min="0" max="100" defaultValue="30" className="w-full" disabled />
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                            <Brightness className="w-5 h-5 text-yellow-500" />
                                            <span className="text-sm">Brightness</span>
                                            <input type="range" min="0" max="100" defaultValue="50" className="w-full" disabled />
                                        </div>
                                    </div>
                                </div>
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