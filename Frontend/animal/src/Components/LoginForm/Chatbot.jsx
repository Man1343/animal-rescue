import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send } from "lucide-react";


const predefinedQuestions = [
    "What services do you offer?",
    "How can I adopt an animal?",
    "What are your rescue policies?",
    "How can I donate?",
    "Do you offer volunteer opportunities?"
];

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // const sendMessage = async () => {
    //     if (!input.trim()) return;
    const sendMessage = async (message) => {
        if (!message.trim()) return;

        // const userMessage = { text: input, sender: "user" };
        const userMessage = { text: message, sender: "user" };
        setMessages([...messages, userMessage]);
        setInput("");

        try {
            // const response = await fetch("/chatbot", {
            const response = await fetch("http://localhost:5000/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ message: input }),
                body: JSON.stringify({ message }),
            });

            // if (!response.ok) {
            //     throw new Error(`Server error: ${response.status}`);
            // }

            const data = await response.json();
            
            // if (!data.response) {
            //     throw new Error("Invalid response format from server");
            // }

            const botMessage = { text: data.response, sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chatbot error:", error);
            // setMessages((prev) => [...prev, { text: "Error: Unable to get response. Please try again later.", sender: "bot" }]);
        }
    };

    // return (
    //     <Card className="w-96 p-4 shadow-lg rounded-2xl fixed bottom-4 right-4 bg-white">
    //         <CardContent className="h-80 overflow-y-auto space-y-2">
    //             {messages.map((msg, index) => (
    //                 <div key={index} className={`p-2 rounded-lg text-sm ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black"}`}>
    //                     {msg.text}
    //                 </div>
    //             ))}
    //         </CardContent>
    //         <div className="flex items-center p-2 border-t">
    //             <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-grow mr-2" />
    //             <Button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-lg">
    //                 <Send size={16} />
    //             </Button>
    //         </div>
    //     </Card>
    // );

    return (
        <div style={{ position: "fixed", bottom: "20px", right: "100px", width: "300px", background: "white", padding: "10px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
            <div style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ padding: "5px", borderRadius: "5px", backgroundColor: msg.sender === "user" ? "#007bff" : "#e5e5e5", color: msg.sender === "user" ? "white" : "black", textAlign: msg.sender === "user" ? "right" : "left" }}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." style={{ width: "80%", padding: "5px", marginRight: "5px" }} />
            <button onClick={sendMessage} style={{ padding: "5px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
                Send
            </button>
        </div>
    );
};

export default Chatbot;
