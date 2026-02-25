# 🎉 Sistema de Confirmação de Presença com Mensageria

## 📌 Sobre o Projeto

Sistema web para confirmação de presença em eventos com verificação via código enviado por e-mail.

O sistema permite:
- Pesquisa de convidados
- Confirmação de presença com validação por código
- Painel administrativo com métricas
- Cadastro e gerenciamento de convidados

---

## 🚀 Funcionalidades

### 🔐 Autenticação
- Login para administradores
- Controle de acesso à área administrativa

### 👤 Confirmação de Presença
- Busca por nome via ComboBox pesquisável
- Exibição de dados do convidado
- Envio de código de confirmação por e-mail
- Validação do código
- Atualização de status para "Confirmado"

### 📊 Dashboard Administrativo
- Total de convidados
- Total confirmados
- Total pendentes
- Percentual de presença
- Gráfico de acompanhamento

### 📝 Cadastro de Convidados
- Criar
- Editar
- Excluir
- Listagem com filtros

---

## 🏗️ Arquitetura

Sistema baseado em:

- Frontend (SPA)
- Backend API REST
- Banco de dados relacional
- Serviço de envio de e-mail (SMTP ou API)

---

## 📦 Estrutura do Sistema

- /login
- /confirmacao
- /dashboard
- /convidados

---

## 🔄 Fluxo de Confirmação

1. Usuário pesquisa seu nome
2. Seleciona seu cadastro
3. Insere e-mail
4. Recebe código
5. Insere código
6. Sistema valida e confirma presença

---

## 📊 Regras de Negócio

- Apenas convidados cadastrados podem confirmar presença
- Código de confirmação possui validade
- Cada convidado só pode confirmar uma vez
- E-mail deve corresponder ao cadastro

---

## 🔐 Segurança

- Autenticação JWT
- Validação de código com expiração
- Proteção contra múltiplas tentativas
- Sanitização de entradas

---

## 🛠️ Tecnologias Sugeridas

Frontend:
- React / Vue / Angular
- Tailwind ou Material UI

Backend:
- Java Spring Boot
- Node.js
- .NET

Banco de Dados:
- PostgreSQL
- MySQL

Mensageria:
- SMTP
- SendGrid
- Amazon SES

---

## 📈 Possíveis Melhorias Futuras

- Confirmação via WhatsApp
- QR Code para check-in no evento
- Exportação de lista em PDF
- Multi-eventos
- Permissão por nível de usuário

---
