/* const data = [
    { id: 1, name: "Portfolio" },
    { id: 2, name: "Contact" },
    { id: 3, name: "Projects" },
]; */
import dayjs from 'dayjs';
import {navIcons, navLinks} from "#constants";
import useWindowStore from "#store/window.js";

const Navbar = () => {
    const { openWindow } = useWindowStore();

    return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className= "font-bold">Les' Portfolio</p>

            <ul>
                {navLinks.map(({ id, name, type }) => (
                    <li key={id} onClick={() => openWindow(type)}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <ul>
                {navIcons.map(({ id, img }) => (
                    <li key={id}>
                        <img src={img} className="icon-hover" alt={`icon-${img}`} />
                    </li>
                ))}
            </ul>

            <time>{dayjs().format('ddd MMM D h:mm A')}</time>
        </div>
    </nav>
    );
};
export default Navbar;
