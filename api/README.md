
# 🛒 API E-commerce

## 🚧 ***PROJETO AINDA ESTÁ EM CONSTRUÇÃO*** 🚧

API RESTful desenvolvida para um sistema de **E-commerce completo**.  
Esta aplicação permite o gerenciamento de:

- 👤 **Usuários**  
- 🔐 **Autenticação com JWT**  
- 📦 **Produtos**  
- 🛒 **Carrinho de Compras**  
- 🧾 **Pedidos (Orders)** *(em breve)*  
- ⭐ **Avaliação de Produtos** *(em breve)*  
- 💖 **Lista de Desejos** *(em breve)*  

> O projeto atende tanto o **cliente final** quanto o **painel administrativo**, com rotas seguras e documentação via Swagger. Integração com front-end em **React**.

---

## 🚀 TECNOLOGIAS UTILIZADAS

- ⚙️ **Node.js + Express** — servidor e rotas  
- 🛢️ **MongoDB + Mongoose** — banco de dados e modelagem  
- 🔐 **JWT** — autenticação segura  
- 🔒 **bcrypt** — hash de senhas  
- 📄 **Swagger** — documentação da API  
- ⚛️ **React** — front-end (em desenvolvimento)  

---

## 💻 COMO RODAR LOCALMENTE

> **Pré-requisitos:**  
> - Node.js instalado  
> - MongoDB em execução local ou conexão remota (MongoDB Atlas, por exemplo)  
> - Git

---

### 🔸 1. Clone o repositório

```bash
git clone https://github.com/Hicaro-Andre/ecommerce-project.git
```

---

### 🔸 2. Acesse a pasta da API

```bash
cd ecommerce-project/api
```

---

### 🔸 3. Instale as dependências do projeto

```bash
npm install
```

---

### 🔸 4. Configure o ambiente

Crie um arquivo `.env` na raiz da pasta `/api` e adicione as variáveis necessárias (exemplo abaixo):

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=sua_chave_secreta
```

> ⚠️ Caso o projeto contenha um `.env.example`, use-o como base.

---

### 🔸 5. Inicie o servidor em modo desenvolvimento

```bash
npm run dev
```

---

### 🔸 6. Acesse no navegador

- ✅ **API funcionando:**  
  `http://localhost:3000`

- 📘 **Documentação Swagger:**  
  `http://localhost:3000/api-docs`

---

## 📚 COMO VER AS ROTAS DISPONÍVEIS?

- A lista básica das rotas está logo abaixo.
- Para ver detalhes completos (corpos esperados, parâmetros, respostas e testes):  
  → Acesse a **documentação Swagger** em `http://localhost:3000/api-docs`

---

## 📚 Rotas Criadas da API

### 🔐 Autenticação
- `POST /users/login` → Autentica usuário e retorna token JWT

---

### 👤 Usuários
- `POST /users` → Cadastrar novo usuário  
- `GET /users` → Listar todos os usuários  
- `GET /users/:id` → Buscar usuário por ID  
- `PUT /users/:id` → Atualizar dados do usuário  
- `DELETE /users/:id` → Deletar usuário por ID

---

### 📦 Produtos
- `POST /products` → Cadastrar novo produto  
- `GET /products` → Listar todos os produtos  
- `GET /products/:id` → Buscar produto por ID  
- `PUT /products/:id` → Atualizar produto  
- `DELETE /products/:id` → Deletar produto

---

### 🛒 Carrinho
- `POST /cart` → Adicionar item ao carrinho

---

### 📊 Painel (Admin)
- `GET /dashboard` → Acessar o painel administrativo

---

### 📦 Pedidos
- `POST /orders` → Criar pedidos  
- `GET /orders` → Listar todos  
- `GET /orders/:id` → Buscar por ID  
- `PUT /orders/:id/pay` → Marcar como Pago 
- `PUT /orders/:id/deliver` → Marcar como entregue


> 🔐 Algumas rotas exigem token JWT no header `Authorization`.  
> Para testar facilmente, use a interface Swagger: `http://localhost:3000/api-docs`
