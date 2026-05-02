import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: { min: 200, max: 500, default: 200 },
    title: { min: 400, max: 900, default: 400 },
};

const ECHO_PRESET = "subtle"; // "subtle" | "neon"

const ECHO_CONFIGS = {
    subtle: {
        y: -3,
        opacity: 0.96,
        textShadow: "0 0 8px rgba(255,255,255,0.35)",
        duration: 0.2,
        stagger: 0.02,
    },
    neon: {
        y: -9,
        opacity: 0.85,
        textShadow: "0 0 22px rgba(120,255,255,0.95), 0 0 138px rgba(120,255,255,0.55)",
        duration: 0.32,
        stagger: 0.035,
    },
};

const renderText = (text, className, baseWeight = 400) => {
    return [... text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return () => {};
    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        const current = parseFloat(
            letter.style.fontVariationSettings.match(/[\d.]+/)?.[0] ?? base
        );
        const proxy = { weight: current };
        return gsap.to(proxy, {
            weight,
            duration,
            ease: "power2.out",
            onUpdate: () => {
                letter.style.fontVariationSettings = `'wght' ${Math.round(proxy.weight)}`;
                letter.style.fontWeight = String(Math.round(proxy.weight));
            },
        });
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;
        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 20000);
            animateLetter(letter, min + (max - min) * intensity);
        });
    };
    const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3));

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const setupEchoHover = (container, preset = "subtle") => {
    if (!container) return () => {};
    const letters = container.querySelectorAll("span");
    if (!letters.length) return () => {};

    const config = ECHO_CONFIGS[preset] ?? ECHO_CONFIGS.subtle;

    const handleMouseEnter = () => {
        gsap.fromTo(
            letters,
            {
                y: 0,
                opacity: 1,
                textShadow: "0 0 0 rgba(255,255,255,0)",
            },
            {
                y: config.y,
                opacity: config.opacity,
                textShadow: config.textShadow,
                duration: config.duration,
                ease: "power2.out",
                stagger: config.stagger,
                yoyo: true,
                repeat: 1,
                overwrite: "auto",
            }
        );
    };

    container.addEventListener("mouseenter", handleMouseEnter);

    return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
    };
};

// ... existing code ...

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const titleCleanup = setupTextHover(titleRef.current, "title");
        const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");
        const titleEchoCleanup = setupEchoHover(titleRef.current, ECHO_PRESET);

        return () => {
            subtitleCleanup();
            titleCleanup();
            titleEchoCleanup();
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText(
                    "Welcome to Les's Portfolio!",
                    "text-3xl font-georama",
                    200,
                )}
            </p>
            <h1 ref={titleRef} className="mt-7">
                {renderText(
                    "Innovation is my Passion",
                    // "text-8xl italic font-georama text-white [-webkit-text-stroke:.5px_#000000]"
                    "text-8xl italic font-georama text-white [-webkit-text-stroke:.7px_#6ee7ff] [text-shadow:-1px_-1px_0_#6ee7ff,1px_-1px_0_#6ee7ff,-1px_1px_0_#6ee7ff,1px_1px_0_#6ee7ff]"
                    // "text-8xl italic font-georama text-[#dffcff] [-webkit-text-stroke:1.5px_#7cf8ff] [text-shadow:0_0_2px_#7cf8ff,0_0_8px_#7cf8ff,0_0_16px_#52e5ff,0_0_30px_#1cc9ff]"
                )}
            </h1>

            <div className="small-screen">
                <p>This portfolio is designed for desktop/tablet screens only.</p>
            </div>
        </section>
    );
};
export default Welcome;