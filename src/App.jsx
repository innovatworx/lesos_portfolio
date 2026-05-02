// import React, {useEffect, useState} from 'react'

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import {WINDOW_CONFIG} from "#constants";

import Navbar from "#components/Navbar.jsx";
import {Welcome} from "#components/index.js";
import Dock from "#components/Dock.jsx";
import { Finder, Resume, Safari, Terminal, Text, Images, Contact } from "#windows";
import Home from "#components/Home.jsx";
// import useWindowStore from "#store/window.js";
import Blurred from "./background/Blurred.jsx";
// import useTheme from "#hooks/useTheme.jsx";
import useTheme from "./hooks/useTheme.jsx";

gsap.registerPlugin(Draggable);


const App = () => {
    const { theme, toggleTheme } = useTheme();


return (
    <main>
        <div className="relative z-50">
            <Navbar onToggleTheme={toggleTheme} theme={theme} />
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

        <Home />
    </main>

    );
};
export default App;
