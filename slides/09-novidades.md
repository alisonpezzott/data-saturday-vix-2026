# O que mudou desde o *preview* de junho

| Quando | O quê |
| :--- | :--- |
| 2 jun | Build 2026: Rayfin open source e Fabric Apps em preview público; Replit como parceiro |
| 16 jul | `fabric-app-data` 1.1: protocolo **Arrow**, contratos SQL para Lakehouse e Warehouse |
| 6 ago | **Acesso anônimo a dados**: tenant setting próprio + `@role('anonymous', …)` |
| 13 ago | Policies com `.and()` / `.or()` e permissão por campo (`include` / `exclude`) |
| 25 ago | Templates próprios: `rayfin-template.yml`, catálogos e `template-registries.yml` |
| 27 ago | Templates 1.1: configuração resolvida em runtime (`resolveRayfinConfig`) |
| 1 set | Plugin **v0.4** para agentes: Claude Code, Copilot CLI, Codex, Cursor, Gemini, Kimi |
| 9 set | CLI **1.35**: `rayfin dev --provider docker`, `docs discover`, service principal no login |

<!--
Alvo: 00:46:30.
Uma linha por entrega, fonte primária em cada uma: datas das páginas do Learn, tags do
GitHub e do npm. É o slide que justifica "novidades" no título — e o que fica velho
mais rápido. Reconferir `npm view @microsoft/rayfin-cli version` na véspera.
-->

---
layout: two-cols-header
---

# Para onde vai

::left::

#### Antes da GA, segundo o time do produto

- **Functions** em TypeScript com secrets: e-mail, APIs externas, Work IQ
- Conectores para SQL DB existente, **Lakehouse** e **Eventhouse**
- Disparar **notebooks e pipelines** e acompanhar o status no app
- **OIDC** para identidade externa; storage em OneLake; observabilidade
- Postgres como segundo dialeto

::right::

#### O que pesa na decisão

- **GA prevista para o fim de 2026**
- "F2 e acima, **sem licença Power BI** para quem consome" — Sachin Patney
- Brazil South: aguardar ou multi-geo
- Preview: o que você constrói hoje vai mudar de versão

<!--
Alvo: 00:47:30.
Fontes: AMA oficial no Reddit recapitulado no blog do Fabric (jul 2026) e a entrevista
do Sachin Patney no Fabric Insider ep. 11 (29 ago 2026).
A frase do licenciamento é declaração do PM Lead, não texto de doc: a doc de
licenciamento ainda não trata do consumo de data app. Citar como declaração e
confirmar antes de vender.
Functions é o pedaço que fecha o círculo do "planejamento": o plano gravado dispara
a ação — e-mail, Teams, pipeline — sem sair do app.
-->
