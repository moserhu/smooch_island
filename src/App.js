import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import StartScreen from "./pages/StartScreen";
import Game from "./pages/Game";
import HowToPlay from "./pages/HowToPlay";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<StartScreen />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/how-to-play" element={<HowToPlay />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
