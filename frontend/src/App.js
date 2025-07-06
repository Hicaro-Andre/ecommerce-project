import React, { useState } from 'react';

function App() {
  const [cpf, setCpf] = useState('');
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const cadastrarCliente = async (e) => {
    e.preventDefault();

    if (!cpf || !name || !email || !password) {
      setMensagem('Por favor, preencha todos os campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMensagem(data.message);
        setCpf('');
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        setMensagem(data.message || 'Erro ao cadastrar');
      }
    } catch (error) {
      setMensagem('Erro ao conectar com servidor');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={cadastrarCliente}>
        <input
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setNome(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setSenha(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Cadastrar
        </button>
      </form>

      {mensagem && <p style={{ marginTop: 20 }}>{mensagem}</p>}
    </div>
  );
}

export default App;
