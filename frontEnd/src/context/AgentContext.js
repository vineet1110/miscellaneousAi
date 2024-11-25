import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
    const [agents, setAgents] = useState([]);

    const fetchAgents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/agents");
            setAgents(response.data);
        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };

    const addAgent = async (agent) => {
        try {
            const response = await axios.post("http://localhost:5000/agents", agent);
            setAgents([...agents, { ...agent, id: response.data.id }]);
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };

    const updateAgent = async (id, updatedAgent) => {
        try {
            await axios.put(`http://localhost:5000/agents/${id}`, updatedAgent);
            setAgents(
                agents.map((agent) =>
                    agent.id === id ? { ...updatedAgent, id } : agent
                )
            );
        } catch (error) {
            console.error("Error updating agent:", error);
        }
    };

    const deleteAgent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/agents/${id}`);
            setAgents(agents.filter((agent) => agent.id !== id));
        } catch (error) {
            console.error("Error deleting agent:", error);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    return (
        <AgentContext.Provider
            value={{ agents, addAgent, updateAgent, deleteAgent }}
        >
            {children}
        </AgentContext.Provider>
    );
};

export const useAgentContext = () => useContext(AgentContext);
