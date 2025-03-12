import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";  

const Game = () => {
    const navigate = useNavigate();
    
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [pairs, setPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState(null);
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [viewership, setViewership] = useState(1);
    const [newPlayer, setNewPlayer] = useState("");
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState(null); // Track the player being edited


    const episodeDetails = [
        { label: "Villa", drawCards: 3 },
        { label: "Date", peopleIcons: 4 },
        { label: "Date", peopleIcons: 4 },
        { label: "Villa", drawCards: 3 },
        { label: "Date", peopleIcons: 3 },
        { label: "Date", peopleIcons: 3 },
        { label: "Villa", drawCards: 2 },
        { label: "Date", peopleIcons: 3 },
        { label: "Date", peopleIcons: 2 },
        { label: "Villa", drawCards: 2 }
    ];

    useEffect(() => {
        // Load game data from local storage
        const savedGame = JSON.parse(localStorage.getItem("smoochIslandGame"));
        if (savedGame) {
            setPlayers(savedGame.players || []);
            setPairs(savedGame.pairs || []);
            setCurrentEpisode(savedGame.currentEpisode || 1);
            setViewership(savedGame.viewership || 1);
        }
    }, []);

    const saveGame = (updatedPlayers, updatedPairs, updatedEpisode, updatedViewership) => {
        localStorage.setItem("smoochIslandGame", JSON.stringify({
            title: "Smooch Island Game",
            players: updatedPlayers,
            pairs: updatedPairs,
            currentEpisode: updatedEpisode,
            viewership: updatedViewership
        }));
    };

    const addPlayer = () => {
        if (newPlayer.trim() && !players.includes(newPlayer)) {
            const updatedPlayers = [...players, newPlayer.trim()];
            setPlayers(updatedPlayers);
            saveGame(updatedPlayers, pairs, currentEpisode, viewership);
            setNewPlayer("");
        }
    };


    const editPlayer = (index, newName) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = newName;
        setPlayers(updatedPlayers);
        saveGame(updatedPlayers, pairs, currentEpisode, viewership);
    };

    const confirmEditPlayer = (index) => {
        if (!players[index].trim()) return;
        saveGame(players, pairs, currentEpisode, viewership);
        setEditingPlayer(null); // Exit edit mode
    };    


    const deletePlayer = (index) => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
        saveGame(updatedPlayers, pairs, currentEpisode, viewership);
    };

    const togglePlayer = (name) => {
        setSelectedPlayers(prev => {
            if (prev.includes(name)) {
                return prev.filter(n => n !== name);
            } else if (prev.length < 2) {
                return [...prev, name];
            }
            return prev;
        });
    };

    const pairPlayers = () => {
        if (selectedPlayers.length === 2) {
            const updatedPairs = [...pairs, selectedPlayers];
            const updatedPlayers = players.filter(p => !selectedPlayers.includes(p));

            setPairs(updatedPairs);
            setPlayers(updatedPlayers);
            setSelectedPlayers([]);
            saveGame(updatedPlayers, updatedPairs, currentEpisode, viewership);
        }
    };

    const selectPair = (index) => {
        setSelectedPair(index === selectedPair ? null : index);
    };

    const breakUpPair = () => {
        if (selectedPair !== null) {
            const [p1, p2] = pairs[selectedPair];
            const updatedPlayers = [...players, p1, p2];
            const updatedPairs = pairs.filter((_, i) => i !== selectedPair);

            setPlayers(updatedPlayers);
            setPairs(updatedPairs);
            setSelectedPair(null);
            saveGame(updatedPlayers, updatedPairs, currentEpisode, viewership);
        }
    };

    const setEpisode = (episode) => {
        setCurrentEpisode(episode);
        saveGame(players, pairs, episode, viewership);
    };

    const setViewershipLevel = (level) => {
        setViewership(level);
        saveGame(players, pairs, currentEpisode, level);
    };

    return (
        <div className="container">
            <div className="top-right-buttons">
                <button className="menu-button" onClick={() => navigate("/")}>Menu</button>
                <button className="add-player-button" onClick={() => setShowPlayerModal(true)}>👤</button>
            </div>
            <h1>Smooch Island</h1>

            {showPlayerModal && (
                <div className="player-modal-overlay">
                    <div className="player-modal">
                        <h2>Manage Players</h2>

                        {/* Add New Player */}
                        <input
                         type="text"
                     value={newPlayer}
                        onChange={(e) => setNewPlayer(e.target.value)}
                      onKeyDown={(e) => {
                       if (e.key === "Enter") {
                            addPlayer();
                           e.target.focus(); // Keeps input field focused
                        }
                          }}
                         placeholder="Enter player name"
                                            />

                        <button onClick={addPlayer}>Add</button>

                        {/* List Existing Players */}
                        <div className="player-list">
                        {players.map((name, index) => (
    <div key={index} className="player-item">
        {editingPlayer === index ? (
            <input
                type="text"
                value={players[index]}
                onChange={(e) => editPlayer(index, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") confirmEditPlayer(index);
                }}
                autoFocus
            />
        ) : (
            <span onClick={() => setEditingPlayer(index)}>{name}</span>
        )}

        {editingPlayer === index ? (
            <button className="confirm-edit" onClick={() => confirmEditPlayer(index)}>✔</button>
        ) : (
            <button className="delete-player" onClick={() => deletePlayer(index)}>🗑</button>
        )}
    </div>
))}

                        </div>

                        <button className="close-modal" onClick={() => setShowPlayerModal(false)}>✖</button>
                    </div>
                </div>
            )}

            <div className="player-and-pool-container">
                <div className="sub-section-wrapper">
                    <div className="section-label">Player Pool</div>
                    <div className="player-pool-container">
                        <div className="players">
                            {players.map(name => (
                                <div 
                                    key={name} 
                                    className={`player ${selectedPlayers.includes(name) ? 'selected' : ''}`}
                                    onClick={() => togglePlayer(name)}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={pairPlayers} disabled={selectedPlayers.length !== 2}>Couple Up</button>
                </div>

                <div className="sub-section-wrapper">
                    <div className="section-label">Paired Players</div>
                    <div className="paired-players-container">
                        <div className="pairs">
                            {pairs.map((pair, index) => (
                                <div 
                                    key={index} 
                                    className={`pair ${selectedPair === index ? 'selected-pair' : ''}`}
                                    onClick={() => selectPair(index)}
                                >
                                    {pair.join(" & ")}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={breakUpPair} disabled={selectedPair === null}>Break Up</button>
                </div>
            </div>

            <div className="section-wrapper">
                <div className="section-label">Episodes</div>
                <div className="episode-container">
                    {episodeDetails.map((ep, i) => (
                        <div 
                            key={i+1} 
                            className={`episode ${currentEpisode === i+1 ? 'active' : ''} ${ep.label === "Villa" ? "villa" : ""}`}
                            onClick={() => setEpisode(i+1)}
                        >
                            <div className="episode-title">Ep. {i+1}</div>  
                            <div className="episode-content">
                                <strong>{ep.label}</strong> <br />
                                {ep.drawCards ? `Draw ${ep.drawCards} Cards` : ''}
                                {ep.peopleIcons ? `👤`.repeat(ep.peopleIcons) : ''}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section-wrapper">
                <div className="section-label">Viewership</div>
                <div className="viewership-container">
                    {[...Array(10)].map((_, i) => (
                        <div 
                            key={i+1} 
                            className={`star ${viewership === i+1 ? 'active' : ''}`}
                            onClick={() => setViewershipLevel(i+1)}
                        >
                            {i+1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;
