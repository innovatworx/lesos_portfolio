import { React, useState } from 'react';
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { socials } from "#constants";
import { WindowControls } from "#components";

const Contact = () => {

    const [hasCopied, setHasCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(' les.alltech@outlook.com');
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>

            <div className="p-5 space-y-5">
                <img
                    src="/images/20260730_1.jpg"
                    // src="/images/adrian.jpg"
                    alt=""
                    // alt="Adrian"
                    className="w-20 rounded-full mx-auto block mt-10 mb-10" />

                <h3>Let's Connect</h3>
                <p>Got an idea? A bug to squash? Or Just wanna talk tech? I'm in.</p>
                {/* <p>contact@jsmastery.pro</p> */}
                <div className="copy-container" onClick={handleCopy}>
                    <img src={hasCopied ? 'images/tick.svg' : 'images/copy.svg'} alt="copy" />
                    <p>les.alltech@outlook.com </p>
                    {/* <p className="lg:text-xl md:text-xl font-medium text-gray_gradient text-white">les.alltech@outlook.com </p> */}
                </div>

                <ul>
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ backgroundColor: bg }}>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={text}>

                                <img
                                    src={icon}
                                    alt={text}
                                    className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
