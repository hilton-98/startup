import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import './sidebar.css';

import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";

function App() {
  return (
    <div>
      <Header />
      <main className="bg-secondary">
        <Sidebar />
        <section className="content">
          Hello There
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
