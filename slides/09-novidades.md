###### 08 · O que mudou

# Desde o *preview* de junho

<ol class="timeline" style="--n: 8; margin-top: 1.4rem;">
  <li style="--i: 1"><b class="when">2 jun</b>Build 2026: Rayfin open source, Fabric Apps em preview público</li>
  <li style="--i: 2"><b class="when">16 jul</b><code>fabric-app-data</code> 1.1: protocolo Arrow, contratos SQL para Lakehouse e Warehouse</li>
  <li style="--i: 3"><b class="when">6 ago</b>Acesso anônimo a dados: tenant setting próprio + <code>@role('anonymous')</code></li>
  <li style="--i: 4"><b class="when">13 ago</b>Policies com <code>.and()</code> / <code>.or()</code> e permissão por campo</li>
  <li style="--i: 5"><b class="when">25 a 27 ago</b>Templates próprios, catálogos e configuração resolvida em runtime</li>
  <li style="--i: 6"><b class="when">1 set</b>Plugin v0.4 para agentes: Claude Code, Copilot CLI, Codex, Cursor, Gemini, Kimi</li>
  <li style="--i: 7"><b class="when">9 set</b>CLI 1.35: <code>rayfin dev --provider docker</code>, <code>docs discover</code>, service principal no login</li>
  <li style="--i: 8" class="future"><b class="when">fim de 2026</b>GA prevista, segundo o time do produto</li>
</ol>

<div class="tags" style="margin-top: 0.9rem;">
  <span class="tag tag--acc">antes da GA</span>
  <span class="tag">Functions em TypeScript com secrets</span>
  <span class="tag">conectores: SQL DB existente, Lakehouse, Eventhouse</span>
  <span class="tag">disparar notebooks e pipelines</span>
  <span class="tag">OIDC</span>
  <span class="tag">Postgres</span>
</div>

<p class="credit">"F2 e acima, sem licença Power BI para quem consome" — Sachin Patney, Fabric Insider ep. 11, 29 ago 2026. Declaração do PM Lead, não texto de doc: confirmar antes de vender.</p>

<!--
Alvo: 00:46:30.
Uma entrega por ponto, fonte primária em cada uma: datas das páginas do Learn, tags
do GitHub e do npm. É o slide que justifica "novidades" no título, e o que fica velho
mais rápido. Reconferir `npm view @microsoft/rayfin-cli version` na véspera.
25 ago: rayfin-template.yml, catálogos e template-registries.yml. 27 ago: templates
1.1 com resolveRayfinConfig.
Roadmap antes da GA, segundo o time do produto (AMA oficial recapitulado no blog do
Fabric em jul 2026 e Fabric Insider ep. 11): Functions em TypeScript com secrets
(e-mail, APIs externas, Work IQ), conectores para SQL DB existente, Lakehouse e
Eventhouse, disparar notebooks e pipelines e acompanhar o status no app, OIDC para
identidade externa, storage em OneLake, observabilidade, Postgres como segundo
dialeto. Functions é o pedaço que fecha o círculo do "planejamento": o plano gravado
dispara a ação (e-mail, Teams, pipeline) sem sair do app.
O que pesa na decisão: GA prevista para o fim de 2026; a frase do licenciamento é
declaração do PM Lead, não texto de doc (a doc de licenciamento ainda não trata do
consumo de data app); Brazil South: aguardar ou multi-geo; preview: o que você
constrói hoje vai mudar de versão.
-->
