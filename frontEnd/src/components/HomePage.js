import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAgentContext } from "../context/AgentContext";
import "./HomePage.css";

const HomePage = () => {
    const { agents, deleteAgent } = useAgentContext();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agentToDelete, setAgentToDelete] = useState(null);

    const handleCreateAgent = () => {
        navigate("/agent-details");
    };

    const handleUpdateAgent = (agent) => {
        navigate("/agent-details", { state: { isEditing: true, agent } });
    };

    const handleDelete = (agent) => {
        setAgentToDelete(agent);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (agentToDelete) {
            deleteAgent(agentToDelete.id);
        }
        setIsModalOpen(false);
        setAgentToDelete(null);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setAgentToDelete(null);
    };

    return (
        <div>
            <div className="home-page">
                <button className="create-agent-btn" onClick={handleCreateAgent}>
                    Create Agent
                </button>
            </div>

            <div className="agent-list">
                {agents.length === 0 ? (
                    <p>No agents found. Click "Create Agent" to add one.</p>
                ) : (
                    agents.map((agent) => (
                        <div key={agent.id} className="agent-item">
                            <p>
                                <strong>Name:</strong> {agent.name}
                            </p>
                            <p>
                                <strong>Description:</strong> {agent.description}
                            </p>
                            <button onClick={() => handleUpdateAgent(agent)}>
                                Update
                            </button>
                            <button
                                id="home-Delete-btn"
                                onClick={() => handleDelete(agent)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete "{agentToDelete?.name}"?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={cancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
