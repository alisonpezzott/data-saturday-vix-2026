###### 06 · Feito para agentes

# O repositório ensina o *agente*

```mermaid
flowchart LR
  P["Descrever a tela<br/>+ link do modelo"] --> A["Agente lê<br/>AGENTS.md · skills · MCP"]
  A --> D["schema-discovery<br/>tabelas · medidas"]
  D --> G["Gera .dax · .json · .tsx"]
  G --> V["Playwright<br/>valida no browser"]
  V --> U["rayfin up"]
  V -. "corrige" .-> G
  classDef acc stroke:#2dd4bf,stroke-width:1.5px
  class V acc
```

<div class="tags">
  <span class="tag"><span class="ico"><carbon-document /></span>AGENTS.md: o contrato do app</span>
  <span class="tag"><span class="ico"><carbon-folder /></span>.agents/skills/: dez skills, na versão instalada</span>
  <span class="tag"><span class="ico"><carbon-api-1 /></span>.mcp.json: Rayfin MCP, a doc da versão certa</span>
  <span class="tag"><span class="ico"><carbon-terminal /></span>npx rayfin docs search</span>
  <span class="tag"><span class="ico"><carbon-chart-bar /></span>Vega-Lite + data grid de fábrica</span>
  <span class="tag"><span class="ico"><carbon-bot /></span>plugin v0.4: Claude Code · Copilot CLI · Codex · Cursor · Gemini CLI · Kimi · VS Code</span>
</div>

<p class="strip strip--plain">Humano decide <strong>o quê</strong> e revisa o PR; o agente monta <strong>como</strong>, contra a doc da versão instalada.</p>

<!--
Alvo: 00:38:30.
O Rayfin foi desenhado para ser lido e escrito por Copilot, Claude Code e afins,
não só por pessoas. A doc do template recomenda exatamente este loop: "use meu
modelo em <link> para gerar um app de X". O link de compartilhamento do modelo já
carrega workspace e item: é o único input que o agente precisa.
O passo Playwright é o que separa demo de produto: o agente abre o app, confere que
o visual renderizou, não cortou, sem erro no console.
Rayfin muda rápido e a doc é travada na versão instalada: `rayfin docs search`,
`rayfin docs get --symbol` e o servidor MCP respondem pelo que está no node_modules.
Na prática: o agente erra menos porque lê a doc certa, e você erra menos porque
pergunta para a mesma fonte. AGENTS.md descreve como o app está ligado e o CLI nunca
o sobrescreve; .agents/skills/ traz dez skills gerenciadas; o plugin oficial v0.4 (1
set) cobre Claude Code, Copilot CLI, Codex, Cursor, Gemini CLI, Kimi e VS Code.
O Universal App da galeria vai além: um "capability router" lê o que você pediu e
habilita só os serviços, pacotes e skills necessários.
Fim da seção: o SDK é a metade; o repositório que ensina o agente é a outra.
-->
