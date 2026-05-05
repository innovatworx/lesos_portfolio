# LesBot Video Implementation Summary

## Overview
This document provides a comprehensive guide to implementing the LesBot video player feature in the LesOS Portfolio project. The video player opens in a window that automatically plays when you hover over it and pauses when the cursor moves away.

---

## What Was Built

### Feature Description
- A clickable video file ("LesBot Demo") inside the "LesBot - AI Chatbot" folder in the Finder
- When clicked, the video file opens in a dedicated video player window
- The video automatically plays when you hover your mouse over it
- The video automatically pauses when you move the cursor away from the video
- The window can be dragged around and closed like any other window in the portfolio

---

## Files Created

### 1. **src/windows/LesBot.jsx**
**Purpose:** Video player window component

**Code:**
```jsx
import React, { useRef } from 'react';
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const LesBotContent = () => {
    const videoRef = useRef(null);
    const { windows } = useWindowStore();
    const data = windows.lesbot?.data;
    const videoUrl = data?.videoUrl || "/vids/LesBot.mp4";

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
                <WindowControls target="lesbot" />
                <h2>{data?.name || "LesBot"}</h2>
            </div>

            <div className="p-5 bg-white">
                <div 
                    className="w-full"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        alt="LesBot Project"
                        className="w-full h-auto max-h-[70vh] object-contain rounded"
                        controls={false}
                    />
                </div>
            </div>
        </>
    );
};

const LesBot = WindowWrapper(LesBotContent, "lesbot");

export default LesBot;
```

**Key Features:**
- Uses `useRef` to control video playback programmatically
- `handleMouseEnter` plays the video when hovering
- `handleMouseLeave` pauses the video when cursor leaves
- Video controls are hidden (`controls={false}`)
- Uses `VideoUrl` from data if available, otherwise defaults to `/vids/LesBot.mp4`

---

## Files Modified

### 1. **src/windows/index.js**
**Purpose:** Export all window components for use throughout the app

**Change Made:**
Added import and export for the LesBot component

**Before:**
```jsx
import Terminal from "#windows/Terminal.jsx";
import Safari from "#windows/Safari.jsx";
import Resume from "#windows/Resume.jsx";
import Finder from "#windows/Finder.jsx";
import Text from "#windows/Text.jsx";
import Images from "#windows/Images.jsx";
import Contact from "#windows/Contact.jsx";

export { Terminal, Safari, Resume, Finder, Text, Images, Contact };
```

**After:**
```jsx
import Terminal from "#windows/Terminal.jsx";
import Safari from "#windows/Safari.jsx";
import Resume from "#windows/Resume.jsx";
import Finder from "#windows/Finder.jsx";
import Text from "#windows/Text.jsx";
import Images from "#windows/Images.jsx";
import Contact from "#windows/Contact.jsx";
import LesBot from "#windows/LesBot.jsx";

export { Terminal, Safari, Resume, Finder, Text, Images, Contact, LesBot };
```

**Why:** Makes the LesBot component available to be imported elsewhere in the project.

---

### 2. **src/windows/Finder.jsx**
**Purpose:** File browser window that displays folder contents and opens items

**Change Made:**
Added handling for video file types to open the LesBot window

**Before:**
```jsx
const openItem = (event, item) => {
    const openFrom = getRectPayload(event);

    if (item.fileType === "pdf") return openWindow("resume", null, openFrom);
    if (item.kind === 'folder') return setActiveLocation(item);
    if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item, openFrom);
};
```

**After:**
```jsx
const openItem = (event, item) => {
    const openFrom = getRectPayload(event);

    if (item.fileType === "pdf") return openWindow("resume", null, openFrom);
    if (item.kind === 'folder') return setActiveLocation(item);
    if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
    if (item.fileType === "video") return openWindow("lesbot", item, openFrom);

    openWindow(`${item.fileType}${item.kind}`, item, openFrom);
};
```

**Why:** When a file with `fileType: "video"` is clicked, it opens the LesBot window with the item data (including videoUrl).

---

### 3. **src/constants/index.js**
**Purpose:** Centralized location for app configuration, including window state and folder structure

**Changes Made:**

#### A. Added Video Item to LesBot Folder
Added a new item to the LesBot - AI Chatbot folder's children array:

**Added Code:**
```jsx
{
    id: 3,
    name: "LesBot Demo",
    icon: "/images/image.png",
    kind: "file",
    fileType: "video",
    position: "top-20 left-10",
    videoUrl: "/vids/LesBot.mp4",
},
```

**Location:** Inside the "LesBot - AI Chatbot" folder definition in the `WORK_LOCATION` object

**Properties Explained:**
- `id: 3` - Unique identifier for this item
- `name: "LesBot Demo"` - Display name shown in Finder
- `icon: "/images/image.png"` - Icon file path (using existing image.png)
- `kind: "file"` - Indicates this is a file, not a folder
- `fileType: "video"` - Type flag used by Finder to determine how to open it
- `position: "top-20 left-10"` - Tailwind position classes for placement in Finder window
- `videoUrl: "/vids/LesBot.mp4"` - Path to the video file

#### B. Added LesBot to WINDOW_CONFIG
Added window state configuration for the lesbot window:

**Before:**
```jsx
const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
};
```

**After:**
```jsx
const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
    lesbot: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, openFrom: null },
};
```

**Why:** Every window needs an entry in WINDOW_CONFIG to manage its state (open/closed, z-index for layering, data passed to it, and position when opening).

---

### 4. **src/index.css**
**Purpose:** Styling for all components, including the Finder window

**Change Made:**
Updated the `.content li` styles to make items clickable with visual feedback

**Before:**
```css
.content {
    @apply flex-1 p-8 bg-white max-w-2xl relative;

    li {
        @apply absolute flex items-center flex-col gap-3;

        img {
            @apply object-contain object-center size-16 relative group-hover:scale-105;
        }

        p {
            @apply text-sm text-center font-medium w-40;
        }
    }
}
```

**After:**
```css
.content {
    @apply flex-1 p-8 bg-white max-w-2xl relative;

    li {
        @apply absolute flex items-center flex-col gap-3 cursor-pointer transition-transform hover:scale-110;

        img {
            @apply object-contain object-center size-16 relative;
        }

        p {
            @apply text-sm text-center font-medium w-40;
        }
    }
}
```

**Changes Explained:**
- Added `cursor-pointer` - Changes mouse cursor to pointer when hovering
- Added `transition-transform` - Smooth animation for scale changes
- Added `hover:scale-110` - Icon scales up 10% on hover for visual feedback
- Removed `group-hover:scale-105` - This wasn't working properly

---

### 5. **src/App.jsx**
**Purpose:** Main application component that renders all windows and components

**Change Made:**
Imported and rendered the LesBot component

**Before:**
```jsx
import { Finder, Resume, Safari, Terminal, Text, Images, Contact } from "#windows";

// ... other code ...

const App = () => {
    // ... component logic ...
    
    return (
        <main>
            <div className="relative z-50">
                <Navbar onToggleTheme={toggleTheme} theme={theme} />
            </div>
            <Welcome />
            <Dock />
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
```

**After:**
```jsx
import { Finder, Resume, Safari, Terminal, Text, Images, Contact, LesBot } from "#windows";

// ... other code ...

const App = () => {
    // ... component logic ...
    
    return (
        <main>
            <div className="relative z-50">
                <Navbar onToggleTheme={toggleTheme} theme={theme} />
            </div>
            <Welcome />
            <Dock />
            <Blurred />

            <Terminal />
            <Safari />
            <Resume />
            <Finder />
            <Text />
            <Images />
            <Contact />
            <LesBot />

            <Home />
        </main>
    );
};
```

**Why:** The LesBot component must be rendered in the main App component for the window to exist and be managed by the window store.

---

## How It All Works Together

### Step-by-Step User Flow:

1. **User Opens Finder**
   - Clicks "Portfolio" in the Dock
   - Finder window opens

2. **Navigate to LesBot Folder**
   - Clicks "LesBot - AI Chatbot" folder in the Projects section
   - Finder displays the folder's contents including "LesBot Demo" video

3. **Click Video File**
   - User clicks on "LesBot Demo" in the Finder
   - `openItem()` function is called in Finder.jsx
   - Function checks `item.fileType === "video"`
   - Calls `openWindow("lesbot", item, openFrom)`
   - This passes the video item data (including videoUrl) to the window store

4. **Window Store Updates**
   - Window store sets `lesbot.isOpen = true`
   - Window store stores `lesbot.data = item` (includes videoUrl)
   - Window store stores animation starting position from `openFrom`

5. **LesBot Component Renders**
   - WindowWrapper HOC detects `lesbot.isOpen === true`
   - LesBot component is rendered
   - WindowWrapper applies opening animation from Finder icon

6. **Video Interaction**
   - Video initially is paused (no autoplay)
   - User hovers over video → `onMouseEnter` fires → video plays
   - User moves cursor away → `onMouseLeave` fires → video pauses

### Technology Stack Used:

- **React Hooks:** `useRef` for video control, `useWindowStore` for state
- **GSAP:** Animation library used by WindowWrapper for window animations
- **Tailwind CSS:** Utility classes for styling
- **HTML5 Video:** Native `<video>` element for playback

---

## Key Concepts Explained

### 1. WindowWrapper HOC (Higher-Order Component)
The `WindowWrapper` is a reusable pattern that wraps any window content component and provides:
- Window dragging functionality (GSAP Draggable)
- Opening/closing animations
- Z-index management for layering
- Window state management from the store

### 2. Window Store Management
The `useWindowStore` manages all window states globally:
- `isOpen` - Whether window is visible
- `zIndex` - Layering order
- `data` - Custom data passed to the window
- `openFrom` - Animation starting position from the clicked element

### 3. useRef for Video Control
The `useRef` hook provides direct access to the DOM video element, allowing programmatic control:
- `videoRef.current.play()` - Starts playback
- `videoRef.current.pause()` - Stops playback

### 4. Event Handlers
- `onMouseEnter` / `onMouseLeave` - Fire when mouse enters/leaves the container
- These control play/pause without needing onclick handlers

---

## File Structure Reference

```
src/
├── windows/
│   ├── index.js              [Modified - Added LesBot export]
│   ├── LesBot.jsx            [Created - Video player component]
│   └── Finder.jsx            [Modified - Added video file handling]
├── constants/
│   └── index.js              [Modified - Added video item and window config]
├── index.css                 [Modified - Added cursor and hover styles]
├── App.jsx                   [Modified - Added LesBot component]
└── ...
```

---

## What to Customize

If you want to modify this implementation:

### Change the Video File:
In `src/constants/index.js`, update the `videoUrl`:
```jsx
videoUrl: "/vids/YOUR_VIDEO.mp4"
```

### Change the Display Name:
In `src/constants/index.js`, update the `name`:
```jsx
name: "Your Custom Name"
```

### Change the Icon:
In `src/constants/index.js`, update the `icon`:
```jsx
icon: "/images/your-icon.png"
```

### Change Video Position in Folder:
In `src/constants/index.js`, update the `position`:
```jsx
position: "top-32 left-20"  // Use Tailwind spacing utilities
```

### Modify Hover Behavior:
In `src/windows/LesBot.jsx`, modify the `handleMouseEnter` and `handleMouseLeave` functions or add additional event handlers like `onClick`.

---

## Troubleshooting

**Issue: Window doesn't open**
- ✓ Verify LesBot is exported in `src/windows/index.js`
- ✓ Verify LesBot is imported and rendered in `src/App.jsx`
- ✓ Check browser console for errors

**Issue: Video doesn't play on hover**
- ✓ Verify `onMouseEnter` and `onMouseLeave` handlers are attached to the video container
- ✓ Check that `videoRef` is properly connected to the `<video>` element
- ✓ Ensure browser allows autoplay (some browsers require user interaction first)

**Issue: Cursor doesn't change to pointer**
- ✓ Verify `cursor-pointer` class is applied in `src/index.css`
- ✓ Check Tailwind CSS is properly configured

---

## Summary

This implementation adds a fully functional video player window to your LesOS Portfolio by:

1. Creating a new video player component (LesBot.jsx)
2. Adding it to the window management system (WINDOW_CONFIG)
3. Connecting it to the Finder for file interaction
4. Styling it with hover effects and proper cursors
5. Rendering it in the main App component

The feature seamlessly integrates with your existing window system, providing smooth animations and intuitive hover-to-play functionality.
