import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAgentContext } from "../context/AgentContext";
import "./AgentDetails.css";

const AgentDetails = () => {
    const { addAgent, updateAgent } = useAgentContext();
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { state } = location;
    const isEditing = state?.isEditing || false;
    const existingAgent = state?.agent;

    useEffect(() => {
        if (isEditing && existingAgent) {
            setName(existingAgent.name);
            setDescription(existingAgent.description);
        }
    }, [isEditing, existingAgent]);

    const handleSave = (e) => {
        e.preventDefault();
        const agent = { name, description };

        if (isEditing) {
            updateAgent(existingAgent.id, agent);
        } else {
            addAgent(agent);
        }

        navigate("/");
    };

    return (
        <div className="agent-details-f">
            <form onSubmit={handleSave}>
                <label htmlFor="Name">Name: </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="Description">Description: </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />
                <button id="agentSaveBtn" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export default AgentDetails;
