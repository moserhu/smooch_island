import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HowToPlay.css"; 

const HowToPlay = () => {
    const navigate = useNavigate();

    return (
        <div className="how-to-play-screen">
            {/* Title Section */}
            <div className="how-to-play-title">
                <h1>How to Play</h1>
            </div>

            {/* Content Section */}
            <div className="how-to-play-content">
                <p>Welcome to Smooch Island! Your goal is to find love, manage viewership, and advance through episodes.</p>
                <ul>
                    <li>At the end of the game, every contestant (i.e. player) reveals
their Intention Card. Contestants win if they are in a couple
with someone revealed to be here for the “Right” reasons.
However, if the show’s viewership ever reaches 10 million
people, the game ends early. Everyone here for the “Wrong”
reasons immediately wins and everyon
e else immediately loses.</li>
                    <li>Progress through 10 episodes.</li>
                    <li>Manage your viewership to win!</li>
                </ul>
            </div>
            <button className="menu-button" onClick={() => navigate("/")}>Back</button>

        </div>
    );
};

export default HowToPlay;
