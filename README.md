<h1 align="center">
    Tools
</h1>

# Índice

- [Descrição](#-descrição-do-projeto)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Instalação](#-como-baixar-o-projeto)

---

## 🖋 Descrição do projeto

API para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

---

## 🚀 Tecnologias utilizadas

o projeto foi desenvolvido usando as seguintes tecnologias:

- [Node.js](https://nodejs.org/pt-br/docs/)
- [Express.js](http://expressjs.com/pt-br/)
- [Knex](http://knexjs.org/)
- Cors
- MySQL
- UUID

---

## 💾 Como baixar o projeto

- Primeiro instale o [Git](https://git-scm.com/), [Node.jS](https://nodejs.org/pt-br/download/) + [npm](https://www.npmjs.com/get-npm)
```bash
# Clonar o repositório
git clone https://github.com/Isabelar07/Ferramenta-Backend-NodeJs.git

# Entrar no diretório
cd Ferramenta-Backend-NodeJs

# Instalar as dependências
npm install

# Rodar o projeto
npm run dev
```

- Crie um arquivo .env na pasta raíz do projeto com as suas informações:

```
DB_HOST = host do banco de dados
DB_USER = user do banco de dados
DB_PASSWORD = senha
DB_NAME = nome do banco de dados
```

---

## Tabelas criadas no Workbench

### Ferramentas
```sql
CREATE TABLE Tools (
	  id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(80) UNIQUE NOT NULL,
    link VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

```

### Tags
```sql
CREATE TABLE Tag (
	  id VARCHAR(255) PRIMARY KEY,
    tags VARCHAR(50) UNIQUE NOT NULL
);
```

### Tag e Ferramentas
```sql
CREATE TABLE Tools_And_Tag (
	  tools_id VARCHAR(255) PRIMARY KEY,
    tag_id VARCHAR(255) NOT NULL,
    FOREIGN KEY(tools_id) REFERENCES Tag(id),
    FOREIGN KEY(tag_id) REFERENCES Tools(id)
);
```

---

Desenvolvido com 🧡 por Isabela Rocha Silveira
