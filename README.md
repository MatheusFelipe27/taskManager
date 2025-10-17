# Task Manager - Frontend Challenge

Este projeto é uma aplicação de gerenciamento de tarefas, construída para organizar e gerenciar tarefas com filtros, tags e prioridades, utilizando **React 19 + Next.js** e **TypeScript**. O foco do projeto está em **código limpo**, **componentização** e **boa arquitetura**.

---

## Tecnologias Utilizadas

- **React 19 + Next.js** → Framework principal para renderização e navegação.
- **TypeScript** → Tipagem estática para maior segurança e legibilidade.
- **Material UI (MUI)** → Biblioteca de componentes para interface moderna e responsiva.
- **React Hook Form** → Manipulação eficiente de formulários e validação.
- **Zod** → Validação de schemas tipados para formulários.
- **Zustand** → Gerenciamento de estado leve e centralizado.
- **Jest + React Testing Library** → Testes unitários e de integração.
- **ESLint & Prettier** → Qualidade e consistência de código.
- **CI/CD (GitHub Actions)** → Execução automática de testes e validação de build.
- **GitFlow** → Organização de branches e commits seguindo boas práticas.
- **Next.js API Routes** → Implementação de endpoints internos para **login**, **logout** e autenticação simulada.
- **Next.js Middleware** → Controle de acesso a rotas públicas e privadas, garantindo segurança e redirecionamento adequado de usuários não autenticados.

---

## Boas Práticas Aplicadas

- **Componentização** → Componentes reutilizáveis e organizados por responsabilidade.
- **Separação de responsabilidades** → Código organizado por módulos.
- **Validação tipada** → Garantia de integridade dos dados com Zod.
- **Gerenciamento de estado leve** → Zustand para centralizar e controlar o estado global.
- **Persistência de filtros e paginação** → Experiência contínua para o usuário.
- **Testes automatizados** → Testes unitários com Jest e React Testing Library.
- **CI/CD** → Execução automática de testes em pushes e pull requests na branch `master`.
- **Deploy online** → A aplicação está disponível e acessível para visualização imediata.
- **Commits organizados e padronizados** → Mensagens de commit claras e consistentes, seguindo boas práticas de versionamento e GitFlow.

---

## Funcionalidades

### Gerenciamento de Tarefas

#### Criação de Tarefas
- Formulário com campos de **título**, **descrição**, **prioridade**, **status** e **tags**.
- Validação de campos usando **Zod**.
- **Tags selecionáveis** com modal para criar novas tags.
- **Persistência** de tarefas, filtros e paginação usando **localStorage**.

#### Edição e Exclusão
- Atualização de tarefas com validação e atualização de estado local.
- Exclusão de tarefas com atualização imediata da interface.

#### Filtros e Busca
- Filtragem por **prioridade** e **status**.
- Busca por **título** em tempo real.
- Configurações de filtros salvas no **localStorage**.

#### Paginação e Scroll
- Paginação das tarefas para melhor experiência em listas longas.
- **Scroll vertical** dentro da lista de tarefas.

#### Tags Dinâmicas
- Criação e seleção de tags para categorizar tarefas.
- Uso de **MUI Chips** com cores e seleção dinâmica.

### Autenticação
- **Login** e **logout** utilizando **API Routes do Next.js**.
- API simulada para autenticação de usuários.
- Estado de login persistente para manter sessão entre recarregamentos.

---

## Estrutura do Projeto

O projeto segue uma **estrutura modular e escalável**, garantindo separação de responsabilidades, reutilização e facilidade de manutenção.  
Esta estrutura é baseada em padrões comuns para aplicações **React + Next.js**, mantendo o código organizado e de fácil navegação.

src/ \
├─ **app/** → Contém as páginas da aplicação e rotas de API \
│  ├─ **private/** → Páginas privadas, acessíveis apenas após autenticação \
│  └─ **api/** → Rotas de API do Next.js (ex.: login, logout, tarefas) \
├─ **components/** → Componentes reutilizáveis de UI e layout \
│  ├─ UI/ # Botões, inputs, modais e outros elementos de interface \
│  └─ layout/ # Layouts de páginas, containers, headers, etc. \
├─ **consts/** → Constantes da aplicação e valores de configuração \
├─ **schemas/** → Schemas Zod para validação de formulários e segurança de tipos \
├─ **stores/** → Stores do Zustand para gerenciamento global de estado \
├─ **types/** → Tipos e interfaces globais TypeScript \
└─ **utils/** → Funções utilitárias e helpers

## Como Executar a Aplicação

Certifique-se de que o Node.js está instalado e siga os passos abaixo para rodar o projeto localmente:

```bash
1. Instalar dependências:
npm install

2. rodar projeto:
npm run dev

3. rodar testes:
npm run test
