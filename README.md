# Password Validator Challenge

Repository containing implementation of the project challenge to build a frontend and microservice using AWS cloud.

Este projeto é dividido em duas partes: o **Frontend** e o **Backend**.
Ambos containerizados utilizando Docker e orquestrados com Docker Compose.

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Configuração e Execução](#configuração-e-execução)
- [Explicação Funcional](#explicação=funcional)

## Visão Geral

O **Validador de Senhas** é uma aplicação que permite ao usuário verificar a conformidade de uma senha.

Critérios validados:

- **Comprimento mínimo**: 9 caracteres
- **Pelo menos 1 dígito**
- **Pelo menos 1 letra minúscula**
- **Pelo menos 1 letra maiúscula**
- **Pelo menos 1 caractere especial** (considerando `!@#$%^&*()-+`)
- **Sem caracteres repetidos**

A aplicação é composta por um frontend desenvolvido em **Angular** e um backend desenvolvido como um **micro serviço**. A comunicação entre frontend e backend é realizada utilizando autenticação via **Client Credentials**.

## Tecnologias Utilizadas

- **Frontend**:
    - Node 22
    - Angular 18
    - Nginx 1.26.2

- **Backend**:
    - Java 21
    - Maven 3.9.9
    - Spring Boot 3.3.3
    - Express.js

- **Orquestração**:
    - Docker
    - Docker Compose

- **Autenticação**:
  - Amazon Cognito

- **Hospedagem em Cloud (AWS)**:
    - Abordagem 01 (implantado)
        - Elastic Compute Cloud (EC2)
    - Abordagem 02 (em desenvolvimento)
        - Elastic Container Registry (ECR)
        - Elastic Load Balancing (ELB)
        - Elastic Container Service (ECS)

## Estrutura do Projeto

**Frontend (Angular)**:
   - Interface de usuário para inserção e validação de senhas
   - Comunica-se com o backend através de chamadas HTTP autenticadas via Client Credentials.

2. **Backend (Spring Boot)**:
   - API RESTful responsável pela lógica de validação das senhas
   - Implementa os critérios de validação conforme especificado

3. **Docker Compose**:
   - Gerencia os containers do frontend e backend

4. **Github Actions**

- Automatiza o processo de deploy dos projetos via Docker
    - Configura credencias e se autentica na Amazon
    - Gera as imagens de cada projeto
    - Envia as imagens geradas no ECR
    - Atualiza os serviços associados ao cluster com tasks definitions para realizar novo deploy

## Arquitetura

> TODO: Pendente de descrição e imagem com diagrama da arquitetura

### Considerações AWS Cloud

> TODO: Pendente de descrição

## Configuração e Execução

### Pré-requisitos

- Opção 01 (Sem Docker)
    - Frontend: NODE 21
    - Backend: Java 21 e Maven 3
- Opção 02 (Com Docker)
    - Docker CLI
    - Docker Compose
    - Docker em Execução

### Passos para Rodar a Aplicação

#### Opção 01

**Frontend**

Navega para dentro da pasta `./frontend`, dentro dela execute:

- `npm run install`
- `npm run start`

**Backend**

Navega para dentro da pasta `./backend`, dentro dela execute:

- `mvn install`
- `mvn spring-boot:run`

Após subir os dois projetos, acessa a aplicação em `http://localhost:4200/`

#### Opção 02

**Construir e iniciar os containers**

Na raiz do repositório, execute:

`docker compose up -d`

> - O `compose' utilizará as imagens de cada projeto para compilar, testar e subir as aplicações
> - O parâmetro `-d` executa as imagens em segundo plano, sem bloquear o terminal

Após carregamento dos projetos pelo docker, acessa a aplicação em `http://localhost`

**Parar os containers**

Na raiz do repositório, execute:

`docker compose down -v`

> - O `compose' irá parar os containers em execução
> - O parâmetro `-v` remove os volumes fixados aos containers

## Explicação Funcional

Ao acessar a aplicação, encontrará na página:

- Um botão de autenticação que realizará a conexão Oauth2 Client Credentials a um Authorization Server, ontem o token de acesso necessário para comunicação com a API
- Um Campo para seleção do tipo de endpoint da API a ser consumida (abordagem para cobertura de cenário em desenvolvimento ou diretamente nos ambientes de deploy na AWS usando EC2 ou um LoadBalancer)
- Um campo de formulário para digitar uma senha a ser validada
- Um botão de validação que realizará o envio da senha para validação pela API