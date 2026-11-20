import dayjs from 'dayjs';
import { Moon, Sun, Wifi, Volume2, Bluetooth, Sun as Brightness, Settings } from "lucide-react";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window.js";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";

const Navbar = ({ onToggleTheme, theme, brightness, onBrightnessChange, volume, onVolumeChange }) => {
    const { openWindow } = useWindowStore();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
    const [currentTime, setCurrentTime] = useState(() => dayjs());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
                        const isThemeToggle = img?.includes("mode.svg") ?? false;
                        const isSettingsIcon = tooltip === "Settings";
                        const isSearchIcon = tooltip === "Search";
                        const isInteractiveIcon = isSettingsIcon;
                        const tooltipText = isThemeToggle ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : tooltip;

                        return (
                            <li
                                key={id}
                                onClick={isThemeToggle ? onToggleTheme : undefined}
                                aria-label={isThemeToggle ? "Toggle theme" : tooltipText}
                                aria-disabled={isSearchIcon ? "true" : undefined}
                                className={isThemeToggle ? "cursor-pointer p-1 rounded hover:bg-gray-200/70 transition-colors" : `${isInteractiveIcon ? "cursor-pointer" : "cursor-default"} p-1 rounded hover:bg-gray-200/70 transition-colors relative`}
                            >
                                {isThemeToggle ? (
                                    theme === "light"
                                        ? <Moon className="w-4 h-4 text-black/80" data-tooltip-id="navbar-tooltip" data-tooltip-content={tooltipText} />
                                        : <Sun className="w-4 h-4 text-amber-300" data-tooltip-id="navbar-tooltip" data-tooltip-content={tooltipText} />
                                ) : isSettingsIcon ? (
                                    <Settings
                                        className="w-4 h-4 text-black/80 cursor-pointer"
                                        aria-label="Settings"
                                        data-tooltip-id="navbar-tooltip"
                                        data-tooltip-content={tooltipText}
                                        onClick={() => setActiveDropdown(activeDropdown === id ? null : id)}
                                    />
                                ) : (
                                    // Original behavior toggled the dropdown for Search too:
                                    // onClick={isInteractiveIcon ? () => setActiveDropdown(activeDropdown === id ? null : id) : undefined}
                                    <img src={img} className={`icon-hover ${isInteractiveIcon ? "cursor-pointer" : "cursor-default"}`} alt={`icon-${img}`} data-tooltip-id="navbar-tooltip" data-tooltip-content={tooltipText} />
                                )}
                                <div className={`absolute top-full mt-1 right--1 bg-white/20 backdrop-blur-md rounded-2xl shadow-none p-4 w-64 z-50 transition-all duration-200 ${activeDropdown === id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                            <Wifi className="w-5 h-5 text-blue-500" />
                                            <span className="text-sm">Wi-Fi</span>
                                            {/* Original static Wi-Fi indicator:
                                            <div className="w-8 h-4 bg-green-500 rounded-full"></div>
                                            */}
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-label="Wi-Fi"
                                                aria-checked={wifiEnabled}
                                                onClick={() => setWifiEnabled((enabled) => !enabled)}
                                                className={`relative h-4 w-8 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${wifiEnabled ? "bg-green-500" : "bg-gray-300"}`}
                                            >
                                                {/* Original knob position omitted an explicit left anchor:
                                                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${wifiEnabled ? "translate-x-4" : "translate-x-0.5"}`} />
                                                */}
                                                <span className={`absolute left-0 top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${wifiEnabled ? "translate-x-4" : "translate-x-0.5"}`} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                            <Bluetooth className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm">Bluetooth</span>
                                            {/* Original static Bluetooth indicator:
                                            <div className="w-8 h-4 bg-gray-300 rounded-full"></div>
                                            */}
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-label="Bluetooth"
                                                aria-checked={bluetoothEnabled}
                                                onClick={() => setBluetoothEnabled((enabled) => !enabled)}
                                                className={`relative h-4 w-8 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${bluetoothEnabled ? "bg-green-500" : "bg-gray-300"}`}
                                            >
                                                {/* Original knob position omitted an explicit left anchor:
                                                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${bluetoothEnabled ? "translate-x-4" : "translate-x-0.5"}`} />
                                                */}
                                                <span className={`absolute left-0 top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${bluetoothEnabled ? "translate-x-4" : "translate-x-0.5"}`} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 cursor-pointer" onClick={() => setActiveDropdown(null)}>
                                            <Volume2 className="w-5 h-5 text-gray-500" />
                                            <span className="text-sm">Volume</span>
                                            {/* Original disabled volume slider:
                                            <input type="range" min="0" max="100" defaultValue="30" className="w-full" disabled />
                                            */}
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={volume}
                                                onChange={(event) => onVolumeChange(Number(event.target.value))}
                                                className="w-full cursor-pointer accent-blue-500"
                                                aria-label="Video volume"
                                            />
                                        </div>
                                        <div className="flex flex-col items-center space-y-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                                            <Brightness className="w-5 h-5 text-yellow-500" />
                                            <span className="text-sm">Brightness</span>
                                            {/* Original disabled brightness slider:
                                            <input type="range" min="0" max="100" defaultValue="50" className="w-full" disabled />
                                            */}
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={brightness}
                                                onChange={(event) => onBrightnessChange(Number(event.target.value))}
                                                className="w-full cursor-pointer accent-yellow-500"
                                                aria-label="Screen brightness"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <Tooltip id="navbar-tooltip" className="app-tooltip" place="bottom" offset={8} />
                <time>{currentTime.format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    );
};

export default Navbar;