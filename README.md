# meu_teste_20260619

Aplicacao web de lista de tarefas criada com Next.js. O projeto permite cadastrar, buscar, filtrar, editar, concluir, remover e restaurar tarefas, com persistencia local no navegador.

## O que foi feito

- O projeto local foi associado ao repositorio GitHub `rodrigomoraes2012/meu_teste_20260619`.
- O remoto `origin` foi ajustado para `https://github.com/rodrigomoraes2012/meu_teste_20260619.git`.
- A conta `rodrigomoraes2012` foi autenticada no Git Credential Manager.
- O commit inicial criado no GitHub foi integrado ao historico local.
- O conflito em `.gitignore` foi resolvido mantendo a lista mais completa de arquivos ignorados.
- A branch `main` foi enviada para o GitHub.

## Funcionalidades

- Criar novas tarefas.
- Marcar tarefas como concluidas ou pendentes.
- Editar tarefas pelo botao de edicao ou com duplo clique no texto.
- Excluir tarefas individualmente.
- Buscar tarefas pelo titulo.
- Filtrar tarefas por todas, pendentes ou concluidas.
- Exibir contadores de total, pendentes e concluidas.
- Limpar todas as tarefas concluidas.
- Restaurar a lista inicial.
- Salvar automaticamente as tarefas no `localStorage` do navegador.

## Tecnologias

- Next.js 15
- React 19
- lucide-react
- ESLint
- JavaScript
- CSS

## Estrutura do projeto

```text
.
|-- app/
|   |-- globals.css       # Estilos globais da aplicacao
|   |-- layout.jsx        # Layout raiz e metadados da pagina
|   `-- page.jsx          # Tela principal e logica da lista de tarefas
|-- .gitignore            # Arquivos e pastas ignorados pelo Git
|-- eslint.config.mjs     # Configuracao do ESLint
|-- jsconfig.json         # Alias de importacao
|-- next.config.mjs       # Configuracao do Next.js
|-- package-lock.json     # Versoes travadas das dependencias
|-- package.json          # Scripts e dependencias do projeto
`-- README.md             # Documentacao do projeto
```

## Requisitos

- Node.js 18.18 ou superior
- npm
- Git

## Instalacao

Clone o repositorio:

```bash
git clone https://github.com/rodrigomoraes2012/meu_teste_20260619.git
```

Entre na pasta do projeto:

```bash
cd meu_teste_20260619
```

Instale as dependencias:

```bash
npm install
```

## Execucao em desenvolvimento

Inicie o servidor local:

```bash
npm run dev
```

Acesse no navegador:

```text
http://localhost:3000
```

## Scripts disponiveis

```bash
npm run dev
```

Executa a aplicacao em modo de desenvolvimento.

```bash
npm run build
```

Gera a versao de producao.

```bash
npm run start
```

Executa a versao de producao gerada pelo build.

```bash
npm run lint
```

Executa a verificacao de qualidade com ESLint.

## Como usar

1. Digite uma tarefa no campo principal.
2. Clique em `Adicionar` para incluir a tarefa na lista.
3. Use o icone circular para alternar entre pendente e concluida.
4. Use a busca para localizar tarefas pelo texto.
5. Use os filtros para alternar entre todas, pendentes e concluidas.
6. Use o botao de lapis para editar uma tarefa.
7. Use o botao de lixeira para excluir uma tarefa.
8. Use `Limpar concluidas` para remover tarefas finalizadas.
9. Use o botao de restaurar no topo para voltar para a lista inicial.

## Persistencia de dados

As tarefas sao salvas no `localStorage` com a chave:

```text
todo-list-next-items
```

Isso significa que os dados permanecem no mesmo navegador apos atualizar ou fechar a pagina. A aplicacao nao usa banco de dados ou API externa.

## Observacoes tecnicas

- A pagina principal e um componente client-side, indicado por `"use client"`.
- A criacao de IDs usa `crypto.randomUUID()`.
- A ordenacao exibe tarefas pendentes antes das concluidas e prioriza as mais recentes.
- O estado inicial possui duas tarefas de exemplo.
- O layout usa CSS responsivo para desktop e mobile.

## Repositorio

GitHub: https://github.com/rodrigomoraes2012/meu_teste_20260619
