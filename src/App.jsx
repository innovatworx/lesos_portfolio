import React from 'react'

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import {WINDOW_CONFIG} from "#constants";

import Navbar from "#components/Navbar.jsx";
import {Welcome} from "#components/index.js";
import Dock from "#components/Dock.jsx";
import { Finder, Resume, Safari, Terminal, Text, Images, Contact } from "#windows";
import Home from "#components/Home.jsx";
import useWindowStore from "#store/window.js";

gsap.registerPlugin(Draggable);

const App = () => {

    const { windows } = useWindowStore();
    const isAnyWindowOpen = Object.values(windows).some((window) => window.isOpen);

    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <div
                className={`absolute inset-0 z-40 bg-black/15 backdrop-blur-md transition-opacity duration-300 pointer-events-none ${
                    isAnyWindowOpen ? "opacity-100" : "opacity-0"
                }`}
            />

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
