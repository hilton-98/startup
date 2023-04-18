import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import { Header } from "./Components/header";
import { Sidebar } from "./Components/sidebar";
import { Footer } from "./Components/footer";

import { Login } from './login/login';
import { HomeContent } from './homeContent';

import AuthState from "./login/authState";
import ClientStorage from './clientStorage';

function App() {

  const [authState, setAuthState] = React.useState(AuthState.UNKOWN);

  const [username, setUsername] = React.useState(ClientStorage.getUsername());

  React.useEffect(() => {

    if (username) {
      fetch(`/api/user/${username}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.UNAUTHENTICATED);
    }
  }, [username]);


  return (
    <div>
      {authState === AuthState.AUTHENTICATED && <Header />}
      <main className="bg-secondary">
        {authState === AuthState.AUTHENTICATED && <Sidebar />}
        {authState === AuthState.AUTHENTICATED && <HomeContent />}
        {authState !== AuthState.AUTHENTICATED && <Login setUsername={setUsername} />}
      </main>
      {authState === AuthState.AUTHENTICATED && <Footer />}
    </div>
  );
}

export default App;
