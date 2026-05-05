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
                    {navIcons.map(({ id, img, tooltip }) => {
                        const isThemeToggle = img.includes("mode.svg");
                        const isInteractiveIcon = tooltip === "Wi-Fi" || tooltip === "Search";
                        const tooltipText = isThemeToggle ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : tooltip;

                        return (
                            <li
                                key={id}
                                onClick={isThemeToggle ? onToggleTheme : undefined}
                                aria-label={isThemeToggle ? "Toggle theme" : tooltipText}
                                className={isThemeToggle ? "cursor-pointer p-1 rounded hover:bg-gray-200/70 transition-colors" : `${isInteractiveIcon ? "cursor-pointer" : "cursor-default"} p-1 rounded hover:bg-gray-200/70 transition-colors relative`}
                            >
                                {isThemeToggle ? (
                                    theme === "light"
                                        ? <Moon className="w-4 h-4 text-black/80" data-tooltip-id="navbar-tooltip" data-tooltip-content={tooltipText} />
                                        : <Sun className="w-4 h-4 text-amber-300" data-tooltip-id="navbar-tooltip" data-tooltip-content={tooltipText} />
                                ) : (
                                    <img src={img} className={`icon-hover ${isInteractiveIcon ? "cursor-pointer" : "cursor-default"}`} alt={`icon-${img}`} onClick={isInteractiveIcon ? () => setActiveDropdown(activeDropdown === id ? null : id) : undefined} data-tooltip-id="navbar-tooltip" data-tooltip-content={tooltipText} />
                                )}
                                <div className={`absolute top-full mt-1 right--1 bg-white/20 backdrop-blur-md rounded-2xl shadow-none p-4 w-64 z-50 transition-all duration-200 ${activeDropdown === id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                            <Wifi className="w-5 h-5 text-blue-500" />
                                            <span className="text-sm">Wi-Fi</span>
                                            <div className="w-8 h-4 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                            <Bluetooth className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm">Bluetooth</span>
                                            <div className="w-8 h-4 bg-gray-300 rounded-full"></div>
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                            <Volume2 className="w-5 h-5 text-gray-500" />
                                            <span className="text-sm">Volume</span>
                                            <input type="range" min="0" max="100" defaultValue="30" className="w-full" disabled />
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer" onClick={() => setActiveDropdown(null)}>
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

                <Tooltip id="navbar-tooltip" className="app-tooltip" place="bottom" offset={8} />
                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    );
};

export default Navbar;