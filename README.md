# Projeto FR Frontend Challenge
Este projeto foi criado com:
- [Angular CLI](https://github.com/angular/angular-cli) versão 13.0.4 para frontend
- [json-server](https://github.com/typicode/json-server) versão 0.17.0 para backend.

## Escopo
Utilizar o framework Angular em sua versão 2 ou superior, sendo de preferência a mais recente para desenvolver
uma aplicação para gerenciar Pontos de Coleta. Ela deve ser capaz de mostrar os pontos de coleta cadastrados
em uma tabela, contendo opções para editar e excluir cada um deles. Também deve conter um botão para adicionar novos pontos de coleta.

## Tecnologias
- [Angular CLI 13.0.4](https://github.com/angular/angular-cli)
- [Nebular 9.0.1](https://akveo.github.io/nebular/)
- [Bootstrap 5.1.3](https://getbootstrap.com/docs/4.5/getting-started/download/)
- [json-server 0.17.0](https://github.com/typicode/json-server)
## API Externa
- [CEP Frete Rápido](https://freterapido.com/cep-rapido/cep/77020534)
  - Cep passado na url: 77020534
## Como instalar e Executar
- ### Frontend
  - Dentro do diretório client, instale as dependências usando `npm install`
  - Depois instale o componente de tabela `npm install --save ng2-smart-table --force`
  - Para compilar/construir `npm run build`
  - Para executar `npm start`
  - Para acessar [http://localhost:4200](http://localhost:4200)
- ### Backend
  - Dentro do diretório server, instale as dependências usando `npm install`
  - Para executar `npm run dev`
  - Para acessar [http://localhost:9190](http://localhost:9190)
## Executar projeto via DOCKER
- Para criação de imagens backend e frontend e levantamento dos containers,
execute o comando `make` na raiz do projeto.
- Acessar frontend [http://localhost:8081](http://localhost:8081)
- Acessar backend [http://0.0.0.0:9190](http://0.0.0.0:9190)
## Dúvidas
Caso há alguma dúvida em relação a este repositório, envie para douglas.braga@freterapido.com