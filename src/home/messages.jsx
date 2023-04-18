import React from 'react';

import './messages.css';

import ClientStorage from "../interfaces/clientStorage";


export function Messages() {


    const [messages, setMessages] = React.useState(ClientStorage.getSchools());

    function renderMessages() {

        const messagesEl = [];

        for (let i = 0; i < messages.length; i++) {

            const message = messages[i];
    
            messagesEl.push(
                <tr key={i}>
                    <td>
                        {message}
                    </td>
                </tr>
            );
        }
    }

    const messagesEl = renderMessages();
    

    return (
        <div className="messages-container">
            <table className="messages-table">
                <thead>
                    <tr>
                        <td>
                            Notifications
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {messagesEl}
                </tbody>
            </table>
        </div>
    );
}