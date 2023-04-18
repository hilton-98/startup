
import './login.css';

export function Login() {
    return (
        <section className="login bg-secondary">
            <div className="login-container">
                <h1>Welcome</h1>
                <p>Please sign in or create an account</p>
                <div className="login-actions">
                    <div className="login-input">
                        <input type="text" id="username-input" placeholder="Your username here" />
                        <input type="password" id="password-input" placeholder="Your password here" />
                    </div>
                    <button id="login-btn" className="login-action-btn">Login</button>
                    <button id="create-account-btn" className="login-action-btn">Create Account</button>
                    <span id="error-msg"></span>
                </div>
            </div>
        </section>
    );
}