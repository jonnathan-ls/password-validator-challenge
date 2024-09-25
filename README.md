# Password Validator Challenge

Repositório contendo implementação do desafio do projeto para construção de frontend e microsserviço utilizando nuvem AWS.

Este projeto contempla a implementação de um desafio para construção de frontend e um microsserviço, e o repositório é composto por uma pasta **frontend** desenvolvido em **Angular** e outra pasta **backend** desenvolvido como um **micro serviço** em **Spring Boot**. 

A comunicação entre aplicação e o micro-serviço é realizada utilizando autenticação via **Client Credentials**. 
Ambos os projetos estão conteinerizados utilizando Docker e orquestrados com Docker Compose.

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Configuração e Execução](#configuração-e-execução)
- [Explicação Funcional](#explicação=funcional)

## Visão Geral

A aplicação permite ao usuário verificar a conformidade de uma senha, com base em determinados critérios:

- **Comprimento mínimo**: 8 caracteres
- **Pelo menos 1 dígito**
- **Pelo menos 1 letra minúscula**
- **Pelo menos 1 letra maiúscula**
- **Pelo menos 1 caractere especial** (considerando `!@#$%^&*()-+`)
- **Sem caracteres repetidos**
- **Sem espaços em brancos**

## Tecnologias Utilizadas

- **Frontend**:
    - Node 22
    - Angular 18
    - Nginx 1.26.2

- **Backend**:
    - Java 21
    - Maven 3.9.9
    - Spring Boot 3.3.3

- **Orquestração**:
    - Docker
    - Docker Compose

- **Autenticação**:
  - Amazon Cognito

- **Hospedagem (AWS)**:
    - Abordagem 01
        - Elastic Compute Cloud (EC2)
    - Abordagem 02
        - Elastic Container Registry (ECR)
        - Elastic Container Service (ECS)
        - Elastic Load Balancing (ELB)

## Estrutura do Projeto

### Frontend (Angular)

- Aplicação foi construída com NG CLI e atualizada com @angular/elements
    - Em desenvolvimento, o elemento utilizado é do próprio Angular (Componente Standalone)
    - Em ambiente, o elemento utilizado é um web-component compilado no lugar do bootstrap da aplicação
- A organização do projeto visa:
    - Arquivos de configuração
    - Compilação dinâmica usando variáveis de ambiente
    - Serviço de autenticação por meio de Client Credentials
    - Interceptador para adição do token de acesso para comunicação com o micro-serviço
    - Separação do componente e serviço responsável por realizar a validação da senha
- A interface de usuário permite:
    - Se autenticar para obtenção do token
    - Selecionar o endpoint em a API será consultada (ambiente e desenvolvimento)
    - Inserir uma senha e realizar a validação da senha  
- Comunicação com o backend através de chamada HTTP autenticada via Client Credentials

### Backend (Spring Boot)

- Micro-serviço (API) responsável pela lógica de validação da senha
- A organização do projeto visa:
    - Serviço responsável por validar a senha
    - Controller responsável por mapear o endpoint para o path de acesso da API
    - Configuração para gerenciamento de controle de autenticação e CORs
- Implementação da lógica com os critérios de validação

**Orquestração**:

- Disponibiliza construção do container que será executado em deploy
    - Permitindo acesso aos endpoints por meio de servidor web do front e do backend
- Gerenciamento dos projetos em um mesmo repositório por meio do Docker Compose

4. **Github Actions**

Automatiza o processo de implantação dos projetos via container, através de:

- Configuração de credencias de execução com a AWS (par de chaves ClientID e ClientSecret)
- Configuração de secrets com variáveis necessárias para implantação dos projetos
- Configuração de credencias autenticação na Amazon
- Gera as imagens de cada projeto, testa, compila e sobe as aplicações
- Envia as imagens geradas para o registry no ECR
- Atualiza os serviços associados ao ECS com tasks definitions forçando um novo deploy

## Arquitetura

> TODO: EM construção + imagem com diagrama da arquitetura

### Considerações AWS Cloud

- **Cognito**: autenticação via Client Credentials entre o frontend e o micro serviço. As credenciais da aplicação são usadas para obter o token de acesso para chamada segura à API.
- **ECR**: repositório de imagens Docker para o frontend e o backend. As imagens são armazenadas no ECR após serem construídas e são referenciadas pelas definições de tarefa no Amazon ECS para serem implantadas e executadas.
- **ECS com Fargate**: orquestra os contêineres Docker. Há um cluster ECS que contém dois serviços: um para o frontend e outro para o backend. Cada serviço está vinculado a uma task definition, que especifica a imagem Docker a ser utilizada (armazenada no ECR) e os recursos alocados (CPU, memória, portas).
- **ALB**: distribui o tráfego entre o frontend (na porta 80) e o backend (na porta 8080), além disso, garante que o endpoint seja fixo e não mude a cada novo deploy, enquanto distribui a carga entre os contêineres do ECS.
- **Security Groups**: regras de firewall definidas com menor privilégio (permitindo acesso apenas a portas específicas) controlando o tráfego de entrada e saída para recursos da AWS
- **VPC**: rede privada padrão utilizada para rodar os serviços ECS, onde o frontend quanto o backend estão acessíveis externamente via internet (através do ALB).

## Configuração e Execução

### Pré-requisitos

- **Opção 01** (Sem Docker)
    - Frontend: NODE 21
    - Backend: Java 21 e Maven 3

- **Opção 02** (Com Docker)
    - Docker CLI
    - Docker Compose
    - Docker em Execução

### Passos para Rodar a Aplicação

#### Opção 01 (Sem Docker)

**Frontend**

Navega para dentro da pasta `./frontend`, dentro dela execute:

- `npm run install`
- `npm run start`

**Backend**

Em outro terminal, navega para dentro da pasta `./backend`, dentro dela execute:

- `mvn install`
- `mvn spring-boot:run`

Após subir os dois projetos, acesse a aplicação em `http://localhost:4200/`

#### Opção 02 (Com Docker)

**Construir e iniciar os containers**

Na **raiz** do repositório, execute:

`docker compose up -d`

> - O `compose` utilizará as imagens de cada projeto para compilar, testar e subir as aplicações
> - O parâmetro `-d` executa as imagens em segundo plano, sem bloquear o terminal

Após carregamento dos projetos pelo docker, acesse a aplicação em `http://localhost`

**Interromper os containers**

Na raiz do repositório, execute:

`docker compose down -v`

> - O `compose` irá parar os containers em execução
> - O parâmetro `-v` remove os volumes fixados aos containers

## Explicação Funcional

Ao acessar a aplicação, encontrará:

- Um botão de autenticação que realizará a autenticação Client Credentials a um Authorization Server, obtendo o token de acesso necessário para comunicação com o micro serviço
- Um campo para seleção do tipo de endpoint da API a ser consumida (abordagem para cobertura de cenário em desenvolvimento ou diretamente nos ambientes de deploy na AWS usando EC2 ou um LoadBalancer)
- Um campo de formulário para digitar uma senha a ser validada
- Um botão de validação que realizará o envio da senha para ser validado pela API

**URLS** de implantação: 

- EC2: http://ec2-44-203-94-189.compute-1.amazonaws.com 
- ALB: http://pwd-validator-alb-857814613.us-east-1.elb.amazonaws.com

> Possivelmente estarão desabilitados, devido a custos de disponibilização

![Video de demonstração da aplicação](./media/pwd-validator-demonstration-app.mp4)