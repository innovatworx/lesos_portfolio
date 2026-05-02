import useWindowStore from "#store/window.js";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const focusWindow = useWindowStore((state) => state.focusWindow);
        const isOpen = useWindowStore((state) => state.windows[windowKey]?.isOpen ?? false);
        const zIndex = useWindowStore((state) => state.windows[windowKey]?.zIndex ?? 0);
        const openFrom = useWindowStore((state) => state.windows[windowKey]?.openFrom ?? null);

        const ref = useRef(null);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            gsap.killTweensOf(el);

            let fromVars = { scale: 0.96, opacity: 0, y: 12 };
            if (openFrom) {
                const width = el.offsetWidth || 1;
                const height = el.offsetHeight || 1;
                const rect = el.getBoundingClientRect();

                const originCenterX = openFrom.x + openFrom.width / 2;
                const originCenterY = openFrom.y + openFrom.height / 2;
                const targetCenterX = rect.left + rect.width / 2;
                const targetCenterY = rect.top + rect.height / 2;

                const startScaleX = openFrom.width / width;
                const startScaleY = openFrom.height / height;
                const startScale = clamp(Math.min(startScaleX, startScaleY), 0.5, 0.98);

                fromVars = {
                    x: originCenterX - targetCenterX,
                    y: originCenterY - targetCenterY,
                    scale: startScale,
                    opacity: 0.35,
                };
            }

            gsap.fromTo(
                el,
                fromVars,
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.16,
                    ease: "power1.out",
                    force3D: true,
                    clearProps: "opacity",
                }
            );
        }, [isOpen, openFrom]);

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey),
            });

            return () => instance.kill();
        }, [isOpen]);

        if (!isOpen) return null;

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                onMouseDown={() => focusWindow(windowKey)}
                className="absolute will-change-transform"
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default WindowWrapper;