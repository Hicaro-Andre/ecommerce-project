import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    api.get('/test')
      .then(res => setMensagem(res.data.message))
      .catch(err => setMensagem('Erro na conexão 😢'));
  }, []);

  return (
    <div style={{ margin: '40px auto', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Teste de Conexão</h1>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>{mensagem || 'Carregando...'}</p>
    </div>
  );
}

export default Home;
