import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

const predefinedQuestions = [
    "What services do you offer?",
    "How can I adopt an animal?",
    "What are your rescue policies?",
    "How can I donate?",
    "Do you offer volunteer opportunities?",
    "How do I report an injured or stray animal?",
    "Are the animal up for adoption vaccinated?",
    "Do you sell pet products online?",
    "Can I return a product I purchased?",
    "What are your working hours?"
];

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async (message) => {
        if (!message.trim()) return;
        
        console.log("Sending message:", message);
        
        const userMessage = { text: message, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        const userId = 1;
        
        try {
            const response = await fetch("http://localhost:8081/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, user_id: userId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Chatbot response:", data.response);
            const botMessage = { text: data.response, sender: "bot" };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, { text: "Error: Unable to get response. Please try again later.", sender: "bot" }]);
        }
    };

    return (
        <div>
            {!isOpen && (
                <button onClick={() => setIsOpen(true)} style={{ 
                    position: "fixed", 
                    bottom: "20px", 
                    right: "100px", 
                    backgroundColor: "#007bff", 
                    border: "none", 
                    borderRadius: "50%", 
                    width: "70px", 
                    height: "70px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    cursor: "pointer", 
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)"
                }}>
                    <MessageCircle color="white" size={24} />
                </button>
            )}
            {isOpen && (
                <div style={{ 
                    position: "fixed", 
                    bottom: "20px", 
                    right: "100px", 
                    width: "320px", 
                    background: "#ffffff", 
                    padding: "15px", 
                    borderRadius: "12px", 
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    fontFamily: "Arial, sans-serif",
                    border: "1px solid #ddd"
                }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <h3 style={{ color: "#007bff", margin: 0 }}>FAQs</h3>
                        <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>✖</button>
                    </div>
                    <div style={{ height: "220px", overflowY: "auto", marginBottom: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "8px" }}>
                        {messages.map((msg, index) => (
                            <div key={index} style={{ 
                                padding: "8px", 
                                borderRadius: "6px", 
                                backgroundColor: msg.sender === "user" ? "#007bff" : "#e5e5e5", 
                                color: msg.sender === "user" ? "white" : "black", 
                                textAlign: msg.sender === "user" ? "right" : "left", 
                                marginBottom: "5px",
                                maxWidth: "80%",
                                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
                            }}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "10px", justifyContent: "center" }}> */}
                    {/* horizontal scroll */}
                    {/* <div style={{ display: "flex", overflowX: "auto", gap: "8px", marginBottom: "10px", paddingBottom: "5px", scrollbarWidth: "thin", maxWidth: "100%" }}> */}
                    {/* vertical scroll */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "10px", maxHeight: "140px", overflowY: "auto", paddingRight: "5px", scrollbarWidth: "thin" }}>
                        {predefinedQuestions.map((question, index) => (
                            <button key={index} onClick={() => sendMessage(question)} style={{
                                minWidth: "140px", 
                                padding: "6px 10px", 
                                backgroundColor: "#f0f0f0", 
                                border: "1px solid #ccc", 
                                cursor: "pointer", 
                                borderRadius: "20px", 
                                fontSize: "12px", 
                                transition: "0.3s", 
                                whiteSpace: "nowrap",
                                flex: "0 0 auto"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#f0f0f0"}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                    {/* <div style={{ display: "flex" }}>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." style={{ 
                            width: "75%", 
                            padding: "8px", 
                            border: "1px solid #ccc", 
                            borderRadius: "20px", 
                            outline: "none" 
                        }} />
                        <button onClick={() => sendMessage(input)} style={{ 
                            padding: "8px 15px", 
                            backgroundColor: "#007bff", 
                            color: "white", 
                            border: "none", 
                            cursor: "pointer", 
                            borderRadius: "20px", 
                            marginLeft: "5px",
                            fontSize: "14px",
                            transition: "0.3s" 
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                        >
                            Send
                        </button>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default Chatbot;
