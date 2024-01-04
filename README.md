# Estrutura da API

Este projeto segue uma arquitetura Model-View-Controller (MVC) para organizar o código da aplicação de forma modular e escalável. Aqui está uma visão geral da estrutura:

## Pastas Principais

- **src**: Contém o código-fonte da aplicação.
  - **config**: Configurações específicas da aplicação.
    - `appConfig.js`: Configuração da URL do modelo de Image.
  - **controllers**: Controladores que gerenciam a lógica de negócios.
    - `ImageController.js`: Controlador responsável pela lógica das operações relacionadas às imagens.
    - `StudentController.js`: Controlador responsável pela lógica das operações relacionadas aos alunos.
    - `TokenController.js`: Controlador responsável pela lógica das operações relacionadas aos tokens.
    - `UserController.js`: Controlador responsável pela lógica das operações relacionadas aos usuários.
  - **database**: Configurações do banco de dados e conexão.
    - `index.js`: Conecta-se ao banco de dados e carrega os modelos.
  - **middlewares**: Middleware de autenticação.
    - `authMiddleware.js`: Middleware que verifica a autenticidade do token JWT para rotas protegidas.
  - **models**: Modelos que definem a estrutura das tabelas do banco de dados.
    - `Image.js`: Modelo para a tabela de imagens.
    - `Student.js`: Modelo para a tabela de alunos.
    - `User.js`: Modelo para a tabela de usuários.
  - **routes**: Definições das rotas da aplicação.
    - `imageRoutes.js`: Rotas relacionadas às imagens.
    - `studentRoutes.js`: Rotas relacionadas aos alunos.
    - `tokenRoutes.js`: Rotas relacionadas aos tokens.
    - `userRoutes.js`: Rotas relacionadas aos usuários.
  - **uploads/images**: Pasta para armazenar as imagens carregadas pelos usuários.
  - **utils**: Utilitários adicionais.
    - `multerConfig.js`: Configurações do Multer para o upload de imagens.

- **.dockerignore**: Configuração de arquivos a serem ignorados pelo Docker.
- **.editorconfig**: Configurações de estilo para editores de código.
- **.env.example**: Exemplo de arquivo de ambiente. Renomeie para `.env` e ajuste conforme necessário.
- **.eslintrc.js**: Configuração do ESLint para manter consistência no estilo de código.
- **docker-compose.yml**: Configurações do Docker Compose para execução da aplicação.
- **Dockerfile**: Configurações para construção da imagem Docker da API Node.
- **nodemon.json**: Configurações para o Nodemon para transpilar o código usando Sucrase/Regenerator.

- **package-lock.json e package.json**: Dependências e configurações do projeto.
- **README.md**: Instruções e informações sobre o projeto.
- **server.js**: Define a porta da aplicação e inicia o servidor Express.

## Estrutura de Rota

### Rotas das Students

- **POST /students (store)**: Cria um novo aluno.
- **GET /students (index)**: Lista todos os alunos.
- **GET /students/:id (show)**: Exibe os detalhes de um aluno específico.
- **PUT /students/:id (update)**: Atualiza as informações de um aluno.
- **DELETE /students/:id (delete)**: Remove um aluno.

### Rotas das Users

- **POST /users (store)**: Cria um novo usuário e gera um token JWT.
- **POST /tokens (store)**: Gera um token JWT para usuários existentes.
- **GET /image (index)**: Lista as imagens associadas aos alunos.
- **POST /image (store)**: Associa uma imagem a um aluno (requer autenticação).

## Autenticação JWT

- **Rotas Protegidas**: Algumas rotas exigem um token JWT válido para acesso.
  - `authMiddleware.js` verifica e autoriza o acesso a rotas protegidas.

## Dependências Principais

- **MySQL 8.0**: Banco de dados utilizado para armazenar os dados da aplicação.
- **Sequelize**: ORM para realizar operações CRUD no banco de dados.
- **Express**: Framework Node.js para construção de aplicações web.
- **Multer**: Middleware para o upload de imagens.
  - [Documentação do Multer](https://www.npmjs.com/package/multer)

Este projeto adota boas práticas de código, mantendo a consistência através do ESLint. Certifique-se de ajustar as configurações do arquivo `.eslintrc.js` conforme necessário para atender às suas preferências de estilo de código.

---

# Rodando a API e o MySQL em sua máquina

Este projeto utiliza Docker para gerenciar seus containers. Siga as instruções abaixo para configurar e executar os containers.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuração Inicial

1. Clone o repositório para sua máquina local:

    ```bash
    git clone https://github.com/WesleyBispo/API_REST.git
    cd API_REST
    ```

2. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias. Você pode usar o arquivo `.env.example` como referência.

3. Execute o seguinte comando para construir as imagens e iniciar os containers:

    ```bash
    docker-compose up -d
    ```

## Atualizando os Containers

Se você fizer alterações no código, siga as etapas abaixo para garantir que as alterações sejam refletidas nos containers:

```bash
docker-compose up -d --build
```

Este comando reconstruirá as imagens, aplicando qualquer alteração no código.

## Removendo os Containers e Imagens

Se desejar remover os containers e a imagem da aplicação (por exemplo, para forçar uma nova construção na próxima inicialização), execute o seguinte comando:

```bash
docker-compose down --rmi local
```

Isso removerá os containers e as imagens construídas localmente no caso como especificado no arquivo `docker-compose` que build a imagem pelo `Dockerfile` será o arquivo da API. Se quiser manter a imagem para a próxima execução, você pode usar o comando:

```bash
docker-compose down
```

## Acessando os logs de ambos contêiners

Se você ao rodar o projeto, deseja analisar alguns logs em seu terminal, basta você digitar o comando :

```bash
docker-compose logs -f
```

Esse comando ficará exibindo os logs em tempo real de ambos os serviços, caso você deseja somente ver de um serviço basta especificar o  nome do serviço/container como abaixo:

```bash
docker-compose logs -f nome_do_servico
```

#### Caso não queira ver os logs em tempo real basta excluir a tag `-f` e caso deseje sair do console de logs basta Crtl+C  

### Alguns comandos docker-compose

- `docker-compose up` : cria e inicia os contêineres.
- ``docker-compose build``: realiza apenas a etapa de build das imagens que serão utilizadas.

- ``docker-compose logs`` : visualiza os logs dos contêineres.

- ``docker-compose restart`` : reinicia os contêineres;
- ``docker-compose ps`` : lista os contêineres;
- ``docker-compose scale`` : permite aumentar o número de réplicas de um contêiner.
- ``docker-compose start`` : inicia os contêineres;
- ``docker-compose stop`` : paralisa os contêineres;
- ``docker-compose down`` : paralisa e remove todos os contêineres e seus componentes como rede, imagem e volume.

## Configurações finais

Após esses processos você já terá sua API em suas mãos, agora você vai precisar criar as tabelas e popular elas, para elas que funcionem da forma correta, vamos aos passos...

1. Você deve acessar o contianer da aplicação Node com esse comando:

    ```bash
    docker exec -it nome_do_container sh
    ```

    Dessa forma você estará acessando o terminal interativo do seu container, observe que o seu caminho a esquerda do seu terminal já deve ter mudado, algo parecido com isso aqui:

2. Após entrar no container você deverá executar primeiramente o comando do ORM usado no projeto, o Sequelize o comando é:

    ```Node
    npx sequelize db:migrate 
    ```

    Esse comando irá geral as tabelas, e por último deve executar:

    ```Node
    npx sequelize db:seed:all 
    ```

    Para popular o seu banco de dados, com users e students, a única coisa que não é gerada automaticamente é as images, na qual o user deve fazer o upload de uma imagem para ser associada a um Student.

Fazendo esses passos corretamente você terá uma `API Node`, com um banco de dados `MySQL` totalmente configurado rodando no incrível mundo do `Docker`, usando uma rede interna. Se quiser saber mais sobre só ler nosso arquivo [docker-compose.yml](docker-compose.yml)

## Problemas Conhecidos

**1. Inicialização da Aplicação Antes do MySQL:**

Certifique-se de que o MySQL esteja totalmente inicializado antes de iniciar a aplicação. Se encontrar problemas de conexão, tente reiniciar os containers. Esse problema está sendo abordado no [docker-compose.yml](docker-compose.yml) do projeto

**2. Requests ao Banco de Dados sem Rodar Migrations/Seeds:**

Evite realizar requests ao banco de dados antes de executar as migrations para criar as tabelas e as seeds para popular os dados. Isso pode levar a resultados inesperados.

---

## Observações

1.Certifique-se de ajustar as variáveis de ambiente no arquivo .env conforme necessário.

2.Lembre-se de rodar docker-compose down antes de fazer alterações significativas no arquivo docker-compose.yml

3. Lembre-se de manter o `docker-compose.yml` na raíz da pasta, assim como o `Dockerfile` eles são os responsáveis por executar os dois contêiners da aplicação.

### ATENÇÃO :  Os comandos de banco de dados, citados na seção acima nas configurações finais , devem ser executados somente no caso de rodas a aplicação pela primeira vez, ou no caso de você excluir os `VOLUMES` do docker, você pode obter mais detalhes sobre os locais de volume, no [docker-compose.yml](docker-compose.yml)

---
