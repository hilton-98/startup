import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Footer } from "./components/footer";

import { Login } from './login/login';
import { HomeContent } from './home/homeContent';

import AuthState from "./login/authState";
import ClientStorage from './clientStorage';

function App() {

  const [authState, setAuthState] = React.useState(AuthState.UNKOWN);
  const [username, setUsername] = React.useState(ClientStorage.getUsername());

  React.useEffect(() => {

    async function loadUserInfo(username) {

      if (username === '') {
        setAuthState(AuthState.UNAUTHENTICATED)
        return;
      }
  
      const response = await fetch(`/api/user/${username}`);
      if (response.status !== 200) {
        setAuthState(AuthState.UNAUTHENTICATED);
        return;
      }
        
      const userInfo = await response.json();
      if (!userInfo) {
        setAuthState(AuthState.UNAUTHENTICATED);
        return;
      }
  
      if (userInfo.authenticated) {
        setAuthState(AuthState.AUTHENTICATED);
      } else {
        setAuthState(AuthState.UNAUTHENTICATED);
      }
    }

    loadUserInfo(username);

  }, [username]);


  return (
    <div>
      {authState === AuthState.AUTHENTICATED && <Header />}
      <main className="bg-secondary">
        {authState === AuthState.AUTHENTICATED && <Sidebar />}
        {authState === AuthState.AUTHENTICATED && <HomeContent />}
        {authState === AuthState.UNAUTHENTICATED && <Login setUsername={setUsername} />}
      </main>
      {authState === AuthState.AUTHENTICATED && <Footer />}
    </div>
  );
}

export default App;
