import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow, minimizeWindow, toggleMaximizeWindow } = useWindowStore();

    return (
        <div id="window-controls">
            <button
                type="button"
                className="close"
                onClick={() => closeWindow(target)}
                aria-label="Close window"
                title="Close window"
            />
            {/*functional maximum and minimum buttons are not necessary*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="minimize"*/}
            {/*    onClick={() => minimizeWindow(target)}*/}
            {/*    aria-label="Minimize window"*/}
            {/*    title="Minimize"*/}
            {/*    disabled*/}
            {/*/>*/}
            {/*<button*/}
            {/*    type="button"*/}
            {/*    className="maximize"*/}
            {/*    onClick={() => toggleMaximizeWindow(target)}*/}
            {/*    aria-label="Maximize window"*/}
            {/*    title="Maximize"*/}
            {/*    disabled*/}
            {/*/>*/}
            {/*<div className="close" onClick={() => closeWindow(target)} />*/}
            <div className="minimize" />
            <div className="maximize" />
        </div>
    );
};

export default WindowControls;