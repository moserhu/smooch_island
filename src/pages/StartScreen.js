import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StartScreen = () => {
    const navigate = useNavigate();
    const [hasSavedGame, setHasSavedGame] = useState(false);

    // Check if a saved game exists in local storage
    useEffect(() => {

        const savedGame = localStorage.getItem("smoochIslandGame");
        setHasSavedGame(!!savedGame);
    }, []);

    // Clear previous game data in local storage and start fresh
    const startNewGame = () => {
        localStorage.removeItem("smoochIslandGame");
        localStorage.setItem("smoochIslandGame", JSON.stringify({ title: "Smooch Island Game", players: [] }));
        navigate("/game");
    };

    return (
        <div className="start-screen">
            <div className="start-screen-content">
                <button onClick={startNewGame}>New Game</button>
                {hasSavedGame && <button onClick={() => navigate("/game")}>Continue</button>}
                <button onClick={() => navigate("/how-to-play")}>How to Play</button>
            </div>
        </div>
    );
};

export default StartScreen;
