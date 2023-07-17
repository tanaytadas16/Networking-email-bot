import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import templates from "./constants";

const EmailForm = () => {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [tempStatus, setTempStatus] = useState(false);
    const [temp2, setTemp2] = useState(false);

    const [isEmailSent, setIsEmailSent] = useState(false); // New state to track successful email sending

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios
                .post("http://localhost:3001/send-email", {
                    recipient,
                    subject,
                    message,
                })

                .then(() => {
                    setRecipient("");
                    setSubject("");
                    setMessage("");
                    setTempStatus(false);
                    setName("");
                    setCompany("");
                    setPosition("");
                }); // Response data from the server (if any)

            setIsEmailSent(true);
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    const generateMessage = () => {
        // Replace [recipient] and [company] with actual values from the state
        const personalizedMessage = message
            .replace("[recipient]", name)
            .replace("[company]", company)
            .replace("[position]", position);
        setMessage(personalizedMessage);
    };

    return (
        <div id="emailFormsContainer">
            <form onSubmit={handleFormSubmit} id="emailForms">
                <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Recipient"
                    required
                    className="formInput"
                />
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    required
                    className="formInput"
                />
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    required
                    className="formInput"
                />
                <div className="TemplateButtons">
                    {templates.map((template) => {
                        // if (template.id === 2) setTemp2(true);
                        return (
                            <button
                                type="button"
                                onClick={() => {
                                    setSubject(template.subject);
                                    setMessage(template.message);
                                    setTempStatus(true);
                                }}
                            >
                                {template.subject}
                            </button>
                        );
                    })}
                </div>

                {tempStatus && (
                    <>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Recipient Name"
                            required
                            className="formInput"
                        />
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company"
                            required
                            className="formInput"
                        />
                    </>
                )}
                {temp2 && (
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Position"
                        className="formInput"
                    />
                )}

                {tempStatus && (
                    <button
                        type="button"
                        id="updateText"
                        onClick={() => {
                            generateMessage();
                            setTempStatus(true);
                        }}
                    >
                        Update Text
                    </button>
                )}

                <button type="submit" id="submit">
                    Send Email
                </button>
            </form>
            {isEmailSent && <p>Email sent successfully!</p>}{" "}
        </div>
    );
};

export default EmailForm;
