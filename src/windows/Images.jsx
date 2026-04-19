import React from 'react';
import useWindowStore from "#store/window.js";
import {WindowControls} from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

// const windowId = `imgfile_${name}`; // or use a timestamp/uuid for duplicates
// openWindow(windowId, { name, imageUrl });

const ImageWindowContent = () => {
// const ImageWindowContent = ({ windowId }) => {

    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;
    // const data = windows[windowId]?.data;


    if (!data) return null;

    const { name, imageUrl } = data;

    return (
        <>
            <div id="window-header" >
                <WindowControls target="imgfile" />
                {/*<WindowControls target={windowId} />*/}
                <h2>{name}</h2>
            </div>

            <div className="p-5 bg-white">
                {imageUrl ? (
                    <div className="w-full">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-auto max-h-[70vh] object-contain rounded"
                        />
                    </div>
                ) : null}
            </div>
        </>
    );
};



const ImageWindow = WindowWrapper(ImageWindowContent, "imgfile");
// const ImageWindow = WindowWrapper(ImageWindowContent, windowId);

export default ImageWindow;
