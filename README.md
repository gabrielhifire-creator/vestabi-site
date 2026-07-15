# Vesta

Landing page pública da Vesta, marca de inteligência operacional aplicada a
diagnóstico, organização de dados, automação assistida e monitoramento de
processos.

- Site: <https://www.vestabi.com/>
- WhatsApp: <https://wa.me/5571981995565>
- E-mail: <contato@vestabi.com>

## Desenvolvimento local

Requisitos: Node.js `22.13.0` e pnpm `11.7.0`.

```bash
corepack enable
corepack prepare pnpm@11.7.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

## Validação e exportação

```bash
pnpm test
pnpm run export:github-pages
```

O export estático é criado em `out/github-pages`. A branch `main` é publicada
automaticamente pelo GitHub Actions somente depois que build e testes passam.
O workflow também verifica o domínio público após cada deploy.

## Publicação

Alterações devem passar por pull request. O workflow valida PRs sem publicar e
faz o deploy no GitHub Pages após a integração na `main`. Nenhuma credencial de
publicação fica armazenada no repositório.
