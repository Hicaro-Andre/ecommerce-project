import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('http://localhost:3333/ping')
      .then((res) => res.json())
      .then((data) => setMensagem(data.message))
      .catch((err) => console.error('Erro ao conectar com a API:', err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React conectado com API</h1>
        <p>Resposta da API: {mensagem}</p>
      </header>
    </div>
  );
}

export default App;
