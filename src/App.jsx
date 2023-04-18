import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Footer } from "./components/footer";

import { Login } from './login/login';
import { HomeContent } from './home/homeContent';
import { ToDo } from './toDo/toDo';
import { Calendar } from './calendar/calendar';
import { About } from './about/about';

import AuthState from "./login/authState";
import ClientStorage from './interfaces/clientStorage';

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
    <div className="app-container">
      {authState === AuthState.AUTHENTICATED && <Header />}

      <main className="bg-secondary">
        {authState === AuthState.AUTHENTICATED && <Sidebar />}
        <Routes>
          <Route path="/" element={(authState === AuthState.UNAUTHENTICATED && <Login setUsername={setUsername}/>) || (authState === AuthState.AUTHENTICATED && <HomeContent />)} exact></Route>
          <Route path="/index" element={(authState === AuthState.UNAUTHENTICATED && <Login setUsername={setUsername}/>) || (authState === AuthState.AUTHENTICATED && <HomeContent />)} exact></Route>
          <Route path="/toDo" element={<ToDo />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
          <Route path="/about" element={<About />}></Route>

        </Routes>

      </main>
      {authState === AuthState.AUTHENTICATED && <Footer />}
    </div>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;
