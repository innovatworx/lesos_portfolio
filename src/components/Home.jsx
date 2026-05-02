import { locations } from "#constants";
import clsx from "clsx";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenProjectFinder = (event, project) => {
        setActiveLocation(project);

        const rect = event.currentTarget.getBoundingClientRect();
        openWindow("finder", null, {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
        });
    };

    useGSAP(() => {
        Draggable.create(".folder");
    }, []);

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={clsx("group folder", project.windowPosition)}
                        onClick={(event) => handleOpenProjectFinder(event, project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Home;