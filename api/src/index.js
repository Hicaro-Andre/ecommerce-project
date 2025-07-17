
const app = require('./app');

//apenas inicia o servidor
app.listen(3333, () => {
  console.log('✅ Servidor rodando em http://localhost:3333');
});

//rota raiz (teste)
app.get("/", (req, res) => {
  res.send("Servidor está rodando");
});
