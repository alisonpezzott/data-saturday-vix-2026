# Microsoft Fabric Apps: aplicativos de dados code-first com Rayfin

Deck Slidev da palestra de 50 minutos no **Data & AI Saturday Vitória 2026**
(19 de setembro de 2026, UniSales). Trinta e seis slides em pt-BR, tema próprio
monocromático (preto, cinzas e um único acento teal), fontes Geist e Geist Mono
empacotadas para renderizar offline no palco, sem demo ao vivo: os dois Fabric
Apps citados aparecem como capturas e como código real. O texto corrido mora nas
notas de apresentador; o slide carrega infográfico, código ou uma frase.

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
| `slides.md` | Headmatter, os três slides da organização e a capa; importa as dez seções |
| `slides/NN-*.md` | Uma seção por arquivo, com notas de apresentador e alvo de tempo em cada slide |
| `snippets/` | Código real importado com `<<<`: policy, DAX, GitHub Actions (os demais ficam como referência) |
| `styles/theme.css` | O tema: tokens, tipografia, layouts, código, tabelas |
| `styles/infographics.css` | Primitivas de infográfico: `tiles`, `steps`, `flow`, `host`, `compare`, listas com glifo, `timeline`, `strip`, `tags`, `score` |
| `setup/shiki.ts` | Tema Shiki monocromático (teal só em keywords e decorators) |
| `setup/mermaid.ts` | Mermaid na mesma paleta |
| `layouts/` | `bleed` (arte da organização, edge-to-edge), `shot` (captura com moldura e legenda) e `end` |
| `global-top.vue` | Rodapé com evento e contador de slides |
| `public/` | Slides da organização (`00-org-*.png`), capturas do Done e do Receita Saudável, QR codes, `og-cover.png`, config de SPA fallback |
| `scripts/` | `deploy.mjs` e `qr.mjs` |

Ícones vêm do conjunto Carbon (`@iconify-json/carbon`, que já chega como dependência
do `@slidev/client` e fica travado no `package-lock.json`) e entram no Markdown como
componente: `<carbon-sql />`. Não há divisores de seção; a primeira slide de
cada seção leva um eyebrow `###### 01 · Nome da seção`.

## Roteiro (50 min)

| # | Seção | Slides | Alvo |
| :--- | :--- | :--- | :--- |
| – | Slides da organização: evento, patrocinadores, comunidade | 1–3 | antes do relógio |
| 0 | Capa (quem fala vai na linha de meta), a lacuna, premissa | 4–6 | 00:00 |
| 1 | A plataforma: Rayfin × Fabric Apps, três serviços filhos, `rayfin up`, pré-requisitos e regiões | 7–10 | 00:04 |
| 2 | Duas formas de app e a forma híbrida | 11–12 | 00:11 |
| 3 | Code-first: entity (magic-move), permissão, evolução de schema, cinco comandos | 13–16 | 00:15 |
| 4 | Modelo semântico como backend: do alias ao hook, DAX, dois modelos, só no portal, modelo mais simples | 17–21 | 00:23 |
| 5 | Demo gravada: Done (duas capturas), Receita Saudável (duas capturas), o que a demo prova | 22–26 | 00:33 |
| 6 | Feito para agentes | 27 | 00:38 |
| 7 | CU, SSO, CI/CD com service principal, dev/prod | 28–31 | 00:40 |
| 8 | O que mudou desde junho, com roadmap | 32 | 00:46 |
| 9 | Quando vale a pena, para levar, QR, fim | 33–36 | 00:48 |

## Antes do evento

- [x] **Capturas do Receita Saudável** em `public/06-rs-*.png`: Visão executiva e Clientes em risco, só dado sintético, slides 24 e 25
- [ ] **Vídeo**: se a rede do evento for confiável, remover `hide: true` do slide do YouTube em `slides/06-demo.md`, logo após o slide 25
- [ ] **Escanear os dois QR** do slide 35 com o celular; o repositório já está público no GitHub
- [ ] Reconferir `npm view @microsoft/rayfin-cli version` e a página de regiões do Learn — o slide 32 e o slide 10 envelhecem rápido
- [ ] Se for publicar o deck, confirmar a URL em `index.html` (Open Graph) e criar `.env` com `DEPLOYMENT_TOKEN=<token>` do Static Web App
- [ ] **Slides da organização**: confirmar com o TIES que `public/00-org-*.png` são as versões finais — as atuais estão em 1920×1080, nativas do projetor
- [ ] Rodar `npm run export:png` e olhar a grade uma última vez

## Convenções

- Conteúdo dos slides em **pt-BR**; código, comentários, identificadores e commits em **inglês**
- Um slide, uma ideia: infográfico, código ou uma frase; até 15 linhas de código visíveis, 80 colunas; até 5 clicks
- O que saiu do slide está na nota: as notas são o roteiro, não a repetição do slide
- Toda afirmação de produto vem de fonte primária (Learn, GitHub, npm) ou está atribuída a quem disse; datas nos slides são as datas das páginas
- **Nenhum dado real de cliente**: as capturas são dos apps Done e Receita Saudável, com dados sintéticos; GUIDs aparecem como `<workspace-id>`
- Nada carrega significado só por cor: marcadores são glifos (`+`, `−`, `✓`, `✕`), contadores ou palavras; o teal só sublinha
- `presenter: dev` só bloqueia a rota; é o `--without-notes` do build que tira as notas do bundle
- Commits em Conventional Commits com escopo `deck`

## Fontes primárias usadas

- [What is Fabric Apps (preview)?](https://learn.microsoft.com/fabric/apps/overview) e o restante da seção `fabric/apps` no Learn: `create-app-with-cli`, `data-apps-template`, `programming-model`, `data-models`, `data-permissions`, `anonymous-data-access`, `fabric-authentication`, `hosting`, `deploy-app`, `deploy-github-actions`, `dev-prod-workflow`, `author-templates`, `pricing`, `troubleshooting`, `faq`
- [Fabric region availability](https://learn.microsoft.com/fabric/admin/region-availability)
- [microsoft/rayfin](https://github.com/microsoft/rayfin) · [awesome-rayfin](https://github.com/microsoft/awesome-rayfin) · npm `@microsoft/rayfin-cli`, `@microsoft/fabric-app-data`
- Blog do Fabric: *Introducing Rayfin*, *Rayfin AMA: your top questions answered*, *Beyond markdown: shareable sites with Rayfin*
- Fabric Insider ep. 11 com Sachin Patney (RADACAD), The New Stack e Azure Blog sobre a Build 2026, Tabular Editor sobre data apps e modelos semânticos
