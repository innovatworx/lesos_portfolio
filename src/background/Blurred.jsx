import React from 'react';
import useWindowStore from "#store/window.js";

const Blurred = () => {

    const { windows } = useWindowStore();
    const isAnyWindowOpen = Object.values(windows).some((window) => window.isOpen);

    return (

        <div
            className={`absolute inset-0 z-40 bg-black/15 backdrop-blur-md transition-opacity duration-300 ${
                isAnyWindowOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        />
    );
};
export default Blurred;
