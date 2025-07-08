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

> **Pré-requisitos**: Node.js, MongoDB, Git

### 🔸 1. Clone o repositório

```bash
git clone https://github.com/Hicaro-Andre/ecommerce-project.git


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

> 🔐 Algumas rotas exigem token JWT no header Authorization.  
> Para documentação detalhada e testes, acesse a documentação Swagger em `/api-docs`.
