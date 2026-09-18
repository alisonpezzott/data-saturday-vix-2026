# Microsoft Fabric Apps: aplicativos de dados code-first com Rayfin

Deck Slidev da palestra de 50 minutos no **Data & AI Saturday Vitória 2026**
(19 de setembro de 2026, UniSales). Cinquenta slides em pt-BR, tema próprio
monocromático (preto, cinzas e um único acento teal), fontes Geist e Geist Mono
empacotadas para renderizar offline no palco, sem demo ao vivo: os dois Fabric
Apps citados aparecem como capturas e como código real.

## Rodar

```bash
npm install
npm run dev          # http://localhost:3030 — presenter em /presenter/
```

Para editar vendo o resultado, registre o servidor MCP do Slidev:

```bash
claude mcp add --transport http slidev http://localhost:3030/__mcp
```

| Comando | O que faz |
| :--- | :--- |
| `npm run export` | PDF com clicks, um arquivo `slides-export.pdf` |
| `npm run export:png` | Um PNG por slide em `png-review/`, para revisar em grade |
| `npm run build` | SPA estática em `dist/`, **sem** as notas de apresentador |
| `npm run deploy` | `build` + publicação no Azure Static Web Apps (token em `.env`) |
| `npm run qr` | Regenera os QR codes em `public/` |

## Estrutura

| Caminho | Conteúdo |
| :--- | :--- |
| `slides.md` | Headmatter e capa; importa as dez seções |
| `slides/NN-*.md` | Uma seção por arquivo, com notas de apresentador e alvo de tempo em cada slide |
| `snippets/` | Código real importado com `<<<`: entities, policies, `rayfin.yml`, `fabric.yaml`, hook, DAX, GitHub Actions |
| `styles/theme.css` | O tema: tokens, tipografia, layouts, código, tabelas |
| `setup/shiki.ts` | Tema Shiki monocromático (teal só em keywords e decorators) |
| `setup/mermaid.ts` | Mermaid na mesma paleta |
| `layouts/` | `shot` (captura com moldura e legenda) e `end` |
| `global-top.vue` | Rodapé com evento e contador de slides |
| `public/` | Capturas do Done, QR codes, `og-cover.png`, config de SPA fallback |
| `scripts/` | `deploy.mjs` e `qr.mjs` |

## Roteiro (50 min)

| # | Seção | Slides | Alvo |
| :--- | :--- | :--- | :--- |
| 0 | Capa, quem fala, a lacuna, premissa | 1–5 | 00:00 |
| 1 | A plataforma: Rayfin × Fabric Apps, três serviços filhos, `rayfin up`, pré-requisitos, regiões | 6–11 | 00:04 |
| 2 | Duas formas de app e a forma híbrida | 12–14 | 00:10 |
| 3 | Code-first: entity, permissão, client tipado, schema, cinco comandos | 15–21 | 00:15 |
| 4 | Modelo semântico como backend: `fabric.yaml`, client, hook, DAX, dois modelos, auth embutida, template | 22–31 | 00:22 |
| 5 | Demo gravada: Done e Receita Saudável, o que a demo prova | 32–36 | 00:34 |
| 6 | Feito para agentes | 37–39 | 00:38 |
| 7 | Deploy, custo, SSO, CI/CD com service principal, dev/prod | 40–44 | 00:41 |
| 8 | O que mudou desde junho e roadmap | 45–46 | 00:46 |
| 9 | Quando vale a pena, para levar, QR, fim | 47–50 | 00:48 |

## Antes do evento

- [ ] **Capturas do Receita Saudável**: abrir o app no portal, capturar Visão executiva e Clientes em risco (só dado sintético), salvar em `public/06-rs-*.png` e trocar o slide 35 por dois slides `layout: shot`
- [ ] **Vídeo**: se a rede do evento for confiável, remover `hide: true` do slide do YouTube em `slides/06-demo.md`
- [ ] Publicar este repositório no GitHub e **escanear o QR** do slide 49 com o celular
- [ ] Reconferir `npm view @microsoft/rayfin-cli version` e a página de regiões do Learn — o slide 45 e o slide 11 envelhecem rápido
- [ ] Se for publicar o deck, confirmar a URL em `index.html` (Open Graph) e criar `.env` com `DEPLOYMENT_TOKEN=<token>` do Static Web App
- [ ] Rodar `npm run export:png` e olhar a grade uma última vez

## Convenções

- Conteúdo dos slides em **pt-BR**; código, comentários, identificadores e commits em **inglês**
- Um slide, uma ideia: até 6 balas, até 15 linhas de código visíveis, 80 colunas
- Toda afirmação de produto vem de fonte primária (Learn, GitHub, npm) ou está atribuída a quem disse; datas nos slides são as datas das páginas
- **Nenhum dado real de cliente**: as capturas são dos apps Done e Receita Saudável, com dados sintéticos; GUIDs aparecem como `<workspace-id>`
- `presenter: dev` só bloqueia a rota; é o `--without-notes` do build que tira as notas do bundle
- Commits em Conventional Commits com escopo `deck`

## Fontes primárias usadas

- [What is Fabric Apps (preview)?](https://learn.microsoft.com/fabric/apps/overview) e o restante da seção `fabric/apps` no Learn: `create-app-with-cli`, `data-apps-template`, `programming-model`, `data-models`, `data-permissions`, `anonymous-data-access`, `fabric-authentication`, `hosting`, `deploy-app`, `deploy-github-actions`, `dev-prod-workflow`, `author-templates`, `pricing`, `troubleshooting`, `faq`
- [Fabric region availability](https://learn.microsoft.com/fabric/admin/region-availability)
- [microsoft/rayfin](https://github.com/microsoft/rayfin) · [awesome-rayfin](https://github.com/microsoft/awesome-rayfin) · npm `@microsoft/rayfin-cli`, `@microsoft/fabric-app-data`
- Blog do Fabric: *Introducing Rayfin*, *Rayfin AMA: your top questions answered*, *Beyond markdown: shareable sites with Rayfin*
- Fabric Insider ep. 11 com Sachin Patney (RADACAD), The New Stack e Azure Blog sobre a Build 2026, Tabular Editor sobre data apps e modelos semânticos
