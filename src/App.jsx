import { useState } from "react";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import {WINDOW_CONFIG} from "#constants";

import Navbar from "#components/Navbar.jsx";
import {Welcome} from "#components/index.js";
import Dock from "#components/Dock.jsx";
import { Finder, Resume, Safari, Terminal, Text, Images, Contact, VideoWindow } from "#windows";
import Home from "#components/Home.jsx";
// import useWindowStore from "#store/window.js";
import Blurred from "./background/Blurred.jsx";
// import useTheme from "#hooks/useTheme.jsx";
import useTheme from "./hooks/useTheme.jsx";

gsap.registerPlugin(Draggable);


const App = () => {
    const { theme, toggleTheme } = useTheme();
    const [brightness, setBrightness] = useState(100);
    const [volume, setVolume] = useState(100);


return (
    <main>
        <div className="relative z-[2001]">
            <Navbar
                onToggleTheme={toggleTheme}
                theme={theme}
                brightness={brightness}
                onBrightnessChange={setBrightness}
                volume={volume}
                onVolumeChange={setVolume}
            />
        </div>
        <Welcome />
        <Dock />

        {/* Disable global page blur so only non-focused windows are blurred */}
         <Blurred />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Images />
        <Contact />
        <VideoWindow volume={volume} />

        <Home />

        <div
            aria-hidden="true"
            className="fixed inset-0 z-[2000] bg-black pointer-events-none transition-opacity duration-75"
            style={{ opacity: (100 - brightness) / 100 }}
        />

    </main>

    );
};
export default App;
