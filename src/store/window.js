import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const getTopMostOpenWindowKey = (windows) => {
    let topKey = null;
    let topZ = INITIAL_Z_INDEX;

    for (const [key, win] of Object.entries(windows)) {
        if (!win?.isOpen) continue;
        if (topKey === null || win.zIndex > topZ) {
            topKey = key;
            topZ = win.zIndex;
        }
    }

    return topKey;
};

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        focusedWindowKey: null,

        openWindow: (windowKey, data = null, openFrom = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;

                win.isOpen = true;
                win.isMinimized = false;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                win.openFrom = openFrom;

                state.focusedWindowKey = windowKey;
                state.nextZIndex++;
            }),

        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;

                win.isOpen = false;
                win.isMinimized = false;
                win.isMaximized = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
                win.openFrom = null;

                if (state.focusedWindowKey === windowKey) {
                    state.focusedWindowKey = getTopMostOpenWindowKey(state.windows);
                }
            }),

        minimizeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win || !win.isOpen) return;

                win.isOpen = false;
                win.isMinimized = true;
                win.zIndex = INITIAL_Z_INDEX;

                if (state.focusedWindowKey === windowKey) {
                    state.focusedWindowKey = getTopMostOpenWindowKey(state.windows);
                }
            }),

        toggleMaximizeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win || !win.isOpen) return;

                win.isMaximized = !win.isMaximized;
                win.zIndex = state.nextZIndex++;
                state.focusedWindowKey = windowKey;
            }),

        focusWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win || !win.isOpen) return;

                win.zIndex = state.nextZIndex++;
                state.focusedWindowKey = windowKey;
            }),
    })),
);

export default useWindowStore;