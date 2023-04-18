import { useState } from 'react';

import './login.css';

import ClientStorage from '../clientStorage';
import ServerInterface from '../serverInterface';
import WebSocketInterface from '../webSocketInterface';


export function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function loginOrCreate(response) {
    
        if (response?.status === 200) {
            ClientStorage.setUsername(username);
            props.setUsername(username);
        } else {
            setErrorMsg(`⚠ Error: ${response.obj.msg}`);
        }
    }

    async function createUser() {
        const response = await ServerInterface.createUser(username, password);
        loginOrCreate(response);
    }
    
    async function login() {

        const response = await ServerInterface.login(username, password);
        loginOrCreate(response);
    }
    
    function isValidUsernameAndPassword() {
        return (username !== '' && password !== '');
    
    }

    async function handleLogin() {
    
        if (!isValidUsernameAndPassword()) {
            return;
        }
    
        await login();
        WebSocketInterface.init();
    }
    
    async function handleCreateAccount() {
    
        if (!isValidUsernameAndPassword()) {
            return;
        }
    
        await createUser();
    }


    return (
        <section className="login bg-secondary">
            <div className="login-container">
                <h1>Welcome</h1>
                <p>Please sign in or create an account</p>
                <div className="login-actions">
                    <div className="login-input">
                        <input 
                            type="text" 
                            placeholder="Your username here"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Your password here"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="login-action-btn" onClick={handleLogin}>Login</button>
                    <button className="login-action-btn" onClick={handleCreateAccount}>Create Account</button>
                    <span>{errorMsg}</span>
                </div>
            </div>
        </section>
    );
}