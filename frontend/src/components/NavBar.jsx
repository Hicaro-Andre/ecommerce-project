import React, { useState } from "react";
import "./App.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">Ecommerce</div>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <a href="/">Início</a>
        <a href="/cadastro">Cadastrar</a>
        <a href="/login">Entrar</a>
      </nav>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default NavBar;
