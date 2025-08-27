# Copilot Instructions for 1023B-backend-novo

## Visão Geral
Este projeto é um backend Node.js utilizando Express e MySQL, com configuração via variáveis de ambiente. O código principal está em `src/index.ts`.

## Estrutura e Fluxo
- O servidor Express é inicializado em `src/index.ts`.
- Todas as conexões ao banco de dados MySQL usam o pacote `mysql2/promise`.
- As variáveis de ambiente obrigatórias são: `DBHOST`, `DBUSER`, `DBPASSWORD`, `DBDATABASE`, `DBPORT`. O código valida explicitamente cada uma antes de tentar conectar.
- O endpoint principal (`/`) apenas testa a conexão com o banco e retorna o valor de `DBHOST`.

## Convenções Específicas
- Todas as variáveis de ambiente devem ser validadas antes do uso. Retorne erro 500 e mensagem clara se alguma estiver ausente.
- Use sempre conexões assíncronas com o banco (`mysql2/promise`).
- Mensagens de erro para variáveis de ambiente seguem o padrão: `"<NOME> não está definido nas variáveis de ambiente"`.
- O servidor escuta na porta 8000 por padrão.

## Dependências e Integrações
- O projeto depende de `express`, `mysql2` e `dotenv`.
- As variáveis de ambiente são carregadas automaticamente via `dotenv/config`.

## Exemplos de Padrão
```typescript
if (process.env.DBHOST === undefined) {
    res.status(500).send("DBHOST não está definido nas variáveis de ambiente");
    return;
}
```

## Build, Testes e Debug
- Não há scripts de build ou testes definidos no `package.json`.
- Para rodar o projeto: `npx ts-node src/index.ts` ou configure um script no `package.json`.
- Debug: Use breakpoints no VS Code em `src/index.ts`.

## Recomendações para Agentes
- Sempre valide variáveis de ambiente antes de qualquer operação dependente.
- Siga o padrão de tratamento de erro já presente no código.
- Mantenha o código simples e direto, seguindo o estilo do arquivo principal.

## Arquivos-chave
- `src/index.ts`: Toda a lógica principal do backend.
- `package.json`: Dependências e scripts (adicionar scripts recomendados).
- `tsconfig.json`: Configuração do TypeScript.

---

Seções incompletas ou dúvidas? Solicite exemplos de endpoints, fluxos de dados ou padrões de integração específicos para detalhar mais.
