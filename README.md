# Mural de Ideias API

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.X.X-green)
![Maven](https://img.shields.io/badge/Maven-4.0.0-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)

API RESTful para um mural de ideias anônimo, onde desenvolvedores podem postar e consultar ideias de projetos para praticar e melhorar suas habilidades.

## ✨ Features

- **CRUD Completo de Ideias:**
  - 📝 **Criar** uma nova ideia
  - 📖 **Ler** todas as ideias ou uma específica por ID
  - 🔄 **Atualizar** uma ideia existente
  - 🗑️ **Deletar** uma ideia
- **Validação de Dados:** Garante que os dados de entrada (título e descrição) não sejam nulos ou vazios.
- **Tratamento de Erros:** Respostas de erro padronizadas para requisições malformadas ou recursos não encontrados.
- **Migrações de Banco de Dados:** Gerenciamento de schema do banco de dados utilizando Flyway.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas e robustas, focando em boas práticas e alta produtividade.

- **Backend:**
  - **Java 17**
  - **Spring Boot** (Web, Data JPA, Validation)
- **Banco de Dados:**
  - **PostgreSQL**
  - **Flyway** (Ferramenta de Migração)
- **Ferramentas de Build e Auxiliares:**
  - **Maven**
  - **Lombok** (Redução de código boilerplate)
  - **MapStruct** (Mapeamento de DTOs)

## 🚀 Começando

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

Você vai precisar ter as seguintes ferramentas instaladas na sua máquina:
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)
- [PostgreSQL](https://www.postgresql.org/download/)
- Um cliente de API como [Postman](https://www.postman.com/downloads/) ou [Insomnia](https://insomnia.rest/download).

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/RegisMichael25/Mural-de-Ideias.git](https://github.com/RegisMichael25/Mural-de-Ideias.git)
    cd mural-de-ideias-api
    ```

2.  **Configure o Banco de Dados:**
    - Crie um novo banco de dados no seu PostgreSQL para este projeto.
      ```sql
      CREATE DATABASE mural_ideias_db;
      ```

3.  **Configure a Aplicação:**
    - Navegue até `src/main/resources/` e renomeie o arquivo `application.properties.example` (se houver) para `application.properties`.
    - Edite o arquivo `application.properties` com as suas credenciais do banco de dados:
      ```properties
      # PostgreSQL
      spring.datasource.url=jdbc:postgresql://localhost:5432/mural_ideias_db
      spring.datasource.username=seu_usuario_postgres
      spring.datasource.password=sua_senha_postgres

      # JPA/Hibernate
      spring.jpa.hibernate.ddl-auto=validate # 'validate' pois o Flyway gerencia o schema
      spring.jpa.show-sql=true
      spring.jpa.properties.hibernate.format_sql=true

      # Flyway
      spring.flyway.enabled=true
      ```

4.  **Construa o projeto:**
    - Use o Maven para limpar, compilar e empacotar a aplicação.
    ```bash
    mvn clean install
    ```

5.  **Execute a Aplicação:**
    - Após o build bem-sucedido, o arquivo `.jar` estará na pasta `target/`. Execute-o com o seguinte comando:
    ```bash
    java -jar target/ideias-0.0.1-SNAPSHOT.jar
    ```
    - A API estará rodando em `http://localhost:8080`.

## ⚙️ Uso da API

Aqui estão os endpoints disponíveis e como usá-los.

### 1. Criar uma Nova Ideia

- **Método:** `POST`
- **URL:** `/ideias`
- **Corpo da Requisição (Body):**
  ```json
  {
      "title": "App de Controle de Hábitos",
      "textarea": "Um aplicativo simples para rastrear hábitos diários, com gráficos de progresso."
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
      "id": 1,
      "title": "App de Controle de Hábitos",
      "textarea": "Um aplicativo simples para rastrear hábitos diários, com gráficos de progresso."
  }
  ```

### 2. Listar Todas as Ideias

- **Método:** `GET`
- **URL:** `/ideias`
- **Resposta de Sucesso (200 OK):**
  ```json
  [
      {
          "id": 1,
          "title": "App de Controle de Hábitos",
          "textarea": "Um aplicativo simples para rastrear hábitos diários, com gráficos de progresso."
      },
      {
          "id": 2,
          "title": "Gerador de Paleta de Cores",
          "textarea": "Uma ferramenta que cria uma paleta de cores a partir de uma imagem que o usuário faz upload."
      }
  ]
  ```

### 3. Obter Ideia por ID

- **Método:** `GET`
- **URL:** `/ideias/{id}`
- **Exemplo:** `GET /ideias/1`
- **Resposta de Sucesso (200 OK):**
  ```json
  {
      "id": 1,
      "title": "App de Controle de Hábitos",
      "textarea": "Um aplicativo simples para rastrear hábitos diários, com gráficos de progresso."
  }
  ```

### 4. Atualizar uma Ideia

- **Método:** `PUT`
- **URL:** `/ideias/{id}`
- **Exemplo:** `PUT /ideias/1`
- **Corpo da Requisição (Body):**
  ```json
  {
      "title": "App de Controle de Hábitos (Atualizado)",
      "textarea": "Uma versão melhorada do app de hábitos, agora com notificações."
  }
  ```
- **Resposta de Sucesso (200 OK):**
  ```json
  {
      "id": 1,
      "title": "App de Controle de Hábitos (Atualizado)",
      "textarea": "Uma versão melhorada do app de hábitos, agora com notificações."
  }
  ```

### 5. Deletar uma Ideia

- **Método:** `DELETE`
- **URL:** `/ideias/{id}`
- **Exemplo:** `DELETE /ideias/1`
- **Resposta de Sucesso:** `204 No Content`

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.

## 👨‍💻 Autor

- **Regis Michael** - [Gmail](regis.michael101@gmail.com) - [LinkedIn](https://www.linkedin.com/in/regis-michael-a1777425b/)
