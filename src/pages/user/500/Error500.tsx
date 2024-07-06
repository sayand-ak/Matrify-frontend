import { useEffect, useState } from 'react';
import './Error500.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const Error500: React.FC = () => {
    const [counter, setCounter] = useState<number>(6); // Number of card elements
    const navigate = useNavigate();

    useEffect(() => {
        // Function to generate random number
        const randomIntFromInterval = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        const cardNodes = document.querySelectorAll('.card-container');
        const perspecNodes = document.querySelectorAll('.perspec');
        const perspec = document.querySelector('.perspec');
        const card = document.querySelector('.error-card');

        // After tilt animation, fire the explode animation
        if (card) {
            card.addEventListener('animationend', () => {
                perspecNodes.forEach((elem) => {
                    (elem as HTMLElement).classList.add('explode');
                });
            });
        }

        // After explode animation do a bunch of stuff
        if (perspec) {
            perspec.addEventListener('animationend', (e) => {
                if ((e as AnimationEvent).animationName === 'explode') {
                    cardNodes.forEach((elem) => {
                        // Add hover animation class
                        (elem as HTMLElement).classList.add('pokeup');

                        // Add event listener to throw card on click
                        elem.addEventListener('click', () => {
                            let updown = [800, -800];
                            let randomY = updown[Math.floor(Math.random() * updown.length)];
                            let randomX = Math.floor(Math.random() * 1000) - 1000;
                            (elem as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px) rotate(-540deg)`;
                            (elem as HTMLElement).style.transition = 'transform 1s ease, opacity 2s';
                            (elem as HTMLElement).style.opacity = '0';
                            setCounter((prevCounter) => prevCounter - 1);
                            if (counter === 0) {
                                const stackContainer = document.querySelector('.stack-container');
                                if (stackContainer) {
                                    (stackContainer as HTMLElement).style.width = '0';
                                    (stackContainer as HTMLElement).style.height = '0';
                                }
                            }
                        });

                        // Generate random number of lines of code between 4 and 10 and add to each card
                        let numLines = randomIntFromInterval(5, 10);

                        // Loop through the lines and add them to the DOM
                        for (let index = 0; index < numLines; index++) {
                            let lineLength = randomIntFromInterval(25, 97);
                            const ulElement = elem.querySelector('.code ul');
                            const node = document.createElement('li');
                            node.classList.add(`node-${index}`);
                            node.style.setProperty('--linelength', `${lineLength}%`);
                            if (ulElement) {
                                ulElement.appendChild(node);
                            }

                            // Draw lines of code 1 by 1
                            if (index === 0) {
                                node.classList.add('writeLine');
                            } else {
                                const prevNode = ulElement?.querySelector(`.node-${index - 1}`);
                                if (prevNode) {
                                    prevNode.addEventListener('animationend', () => {
                                        node.classList.add('writeLine');
                                    });
                                }
                            }
                        }
                    });
                }
            });
        }
    }, [counter]);

    return (
        <div className="error-container">
            <div className="error-500">
                <h1>500</h1>
                <h2>error</h2>
                <p>
                    Ruh-roh, something just isn't right... Time to paw through your logs
                    and get down and dirty in your stack-trace;)
                </p>
                <button 
                    className='px-4 py-2  text-white rounded-md hover:bg-blue-700 transition-colors duration-300'
                    onClick={() => navigate(-1)}
                >
                    Go back
                </button>
            </div>
            <div className="stack-container">
                {[...Array(6)].map((_, index) => (
                    <div className="card-container" key={index}>
                        <div
                            className="perspec"
                            style={{
                                '--spreaddist': `${125 - index * 25}px`,
                                '--scaledist': `${0.75 + index * 0.05}`,
                                '--vertdist': `${-25 + index * 5}px`,
                            } as React.CSSProperties}
                        >
                            <div className="error-card">
                                <div className="writing">
                                    <div className="topbar">
                                        <div className="red"></div>
                                        <div className="yellow"></div>
                                        <div className="green"></div>
                                    </div>
                                    <div className="code">
                                        <ul></ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Error500;
