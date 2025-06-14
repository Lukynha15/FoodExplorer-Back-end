# Food Explorer - Backend

## Descrição

Backend da aplicação **Food Explorer**, desenvolvido em Node.js com Express. Gerencia operações de autenticação de usuários, administração de pratos e seus respectivos detalhes (ingredientes, imagem, categoria, etc). Utiliza banco de dados SQLite e ORM Knex.js.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Knex.js**
- **SQLite3**
- **Multer** (upload de imagens)
- **JWT** (autenticação)
- **BCrypt.js** (hash de senhas)
- **CORS**

---

## Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/Lukynha15/FoodExplorer-Back-end
cd foodexplorer-back-end
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o banco de dados:**

```bash
npx knex migrate:latest
```

4. **Execute o servidor em modo desenvolvimento:**

```bash
npm run dev
```

---

## Estrutura de Pastas

```
src/
├── controllers/        # Lógica dos controllers (Users, Dishes, etc)
├── database/
│   ├── knexfile.js     # Configuração do knex
│   └── migrations/     # Migrations do banco
├── middlewares/       # Middlewares (ex: autenticação JWT)
├── routes/            # Definição das rotas
├── server.js          # Arquivo principal do servidor
└── utils/             # Utilitários (ex: AppError)
```

---

## Rotas Principais

/users: Cadastro e atualização de usuários

/sessions: Autenticação de usuários (login)

/dishes: CRUD de pratos (criação, listagem, atualização, deleção)

---

## Scripts

- `npm run dev`: Executa o servidor com Nodemon.

---

## Observações

- As imagens dos pratos são armazenadas na pasta `/tmp/uploads`.
- JWT é usado para autenticação e autorização de rotas.
- As senhas dos usuários são armazenadas de forma segura usando bcrypt.js.

---

## Autor

Desenvolvido por Lucas Assmann.

---

## Licença

Este projeto está licenciado sob a licença ISC.

---

