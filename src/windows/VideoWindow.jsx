import React, { useRef } from 'react';
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const VideoWindowContent = () => {
    const videoRef = useRef(null);
    const { windows } = useWindowStore();
    const data = windows.video?.data;
    const videoUrl = data?.videoUrl || "";

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="video" />
                <h2>{data?.name || "Video Preview"}</h2>
            </div>

            <div className="bg-transparent">
            {/* <div className="p-5 bg-transparent"> */}
                <div 
                    className="w-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        alt={`${data?.name || "Video project"}`}
                        className="w-full h-auto max-h-[70vh] object-contain rounded"
                        controls={false}
                    />
                </div>
            </div>
        </>
    );
};

const VideoWindow = WindowWrapper(VideoWindowContent, "video");

export default VideoWindow;
