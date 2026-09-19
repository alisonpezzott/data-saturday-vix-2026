###### 01 · A plataforma

# Rayfin e Fabric Apps *não* são a mesma coisa

<div class="compare" style="margin-top: 0.6rem;">
  <div class="panel">
    <h4><span class="ico"><carbon-code /></span>Rayfin</h4>
    <ul>
      <li>SDK + CLI <strong>open source</strong> (MIT), em TypeScript</li>
      <li>Declara dados, políticas, auth e hosting <strong>em código</strong></li>
      <li>CLI <strong>1.35.0</strong>, 9 set 2026 · <code>github.com/microsoft/rayfin</code></li>
    </ul>
    <p class="foot">a peça de código, instalada do npm</p>
  </div>
  <div class="vs">≠</div>
  <div class="panel">
    <h4><span class="ico"><carbon-cloud-app /></span>Fabric Apps</h4>
    <ul>
      <li><strong>Workload</strong> do Fabric que executa o backend</li>
      <li>Item <strong>App</strong> no workspace, com serviços filhos</li>
      <li>Preview desde <strong>2 jun 2026</strong>, na Build · GA prevista para o fim de 2026</li>
    </ul>
    <p class="foot">o serviço gerenciado, no seu tenant</p>
  </div>
</div>

<p class="credit">"Fabric Apps isn't an app builder, it's a backend as a service." — Sachin Patney, PM Lead de app development no Fabric · Fabric Insider ep. 11, ago 2026</p>

<!--
Alvo: 00:04.
Separar os dois nomes economiza dez perguntas depois. Rayfin é a peça de código,
aberta, que você instala do npm (14 pacotes @microsoft/rayfin-*); Fabric Apps é onde
ela roda como serviço gerenciado.
Os dois nasceram juntos em 2 de junho de 2026, na Build: Rayfin open source e Fabric
Apps em preview público, com a Replit como parceira de lançamento ("agents write the
code, Fabric ships it"). A tese: o backend do app vive dentro do data estate,
herdando identidade e governança. Fontes: The New Stack e Azure Blog do Arun Ulag,
ambos de 2 jun 2026.
A frase do Sachin é a mais importante do slide: não é um app builder. Não compete
com Power Apps no "arrastar tela"; compete com Supabase e Firebase no backend.
GA "fim de 2026" é declaração do PM Lead e do AMA oficial, não é data na doc.
-->

---

# Um item, três serviços filhos

<div class="host" style="margin-top: 0.8rem;">
  <span class="label">Item App · no workspace, ao lado do Lakehouse e do report</span>
  <div class="tiles" style="--cols: 3">
    <div class="tile">
      <h4><span class="ico"><carbon-sql /></span>SQL database</h4>
      <p>Schema gerado dos decorators, espelhado no OneLake</p>
      <p class="foot">query editor read-only: o schema vem do código</p>
    </div>
    <div class="tile">
      <h4><span class="ico"><carbon-locked /></span>Authentication</h4>
      <p>Fabric brokered auth com Entra ID: SSO</p>
      <p class="foot">tabela de usuários autenticados</p>
    </div>
    <div class="tile">
      <h4><span class="ico"><carbon-application-web /></span>Static content</h4>
      <p>Frontend buildado, servido do OneLake</p>
      <p class="foot">URL pública do app</p>
    </div>
  </div>
</div>

<div class="strip" v-click>
  <span class="ico"><carbon-api-1 /></span>
  <span>Um endpoint:</span>
  <code>https://&lt;app&gt;-app.rayfin.windows.net</code>
  <code>/api/graphql</code>
  <code>/auth</code>
  <code>/storage</code>
</div>

<!--
Alvo: 00:06.
O banco é read-only no portal DE PROPÓSITO: mudança de schema vem do código.
Quem mexer pelo query editor gera conflito e pode quebrar o app; está na doc de
troubleshooting, não é opinião. E o SQL database in Fabric já espelha para o OneLake:
o que o app grava aparece em Delta sem pipeline.
[click] Endpoint único: dados em /api/graphql, sessão em /auth, arquivos em /storage.
O frontend é servido de outra URL, em webapp.fabricapps.net, também atrás do SSO.
-->

---

# O que acontece em um `rayfin up`

<ol class="steps" style="--cols: 6; margin-top: 1.4rem;">
  <li><strong>Item App</strong><small>cria no workspace, ou reusa o existente</small></li>
  <li><strong>Publishable key</strong><small><code>pk-*</code>, a única chave segura no client</small></li>
  <li><strong><code>rayfin.yml</code></strong><small>sincroniza auth, serviços e redirect URIs</small></li>
  <li><strong>Schema</strong><small>dos decorators para o SQL database</small></li>
  <li><strong>Build + ZIP</strong><small>até 100 MB, publicado no OneLake</small></li>
  <li><strong><code>.env</code></strong><small>ponteiro para o deployment ativo</small></li>
</ol>

<div class="strip strip--plain">
  <span class="ico"><carbon-timer /></span>
  <span>Primeiro deploy: <strong>2 a 5 min</strong> · só o estático: <strong>30 a 60 s</strong> · idempotente: o segundo <code>up</code> atualiza o mesmo item</span>
</div>

<!--
Alvo: 00:07:30.
Seis passos, na ordem da doc de deploy. O que importa para engenheiro:
idempotente, o segundo up atualiza o mesmo item; a publishable key é o que vai para
o bundle, e nada além dela; o yml é sincronizado ANTES do schema; no schema só o que
for não-destrutivo passa sem --force; o limite de 100 MB pega quem embute vídeo no
bundle; e o .env (rayfin/.env e .env.fabric-<workspace>) é um ponteiro para o
deployment ativo, não fonte da verdade.
Primeiro deploy: 2 a 5 minutos. Só estático: 30 a 60 segundos (FAQ oficial).
-->

---

# Antes de começar: o que *morde* no preview

<div class="tiles" style="grid-template-columns: 1.15fr 1fr 1fr; margin-top: 0.8rem;">
  <div class="tile tile--acc tile--tall">
    <h4><span class="ico"><carbon-globe /></span>Regiões</h4>
    <span class="kpi">19<small>regiões</small></span>
    <p><strong>Brazil South ainda não.</strong> Recomendação do AMA: West US 2 ou North Central US.</p>
    <p class="foot">lista do Learn em 7 set 2026</p>
  </div>
  <div class="tile">
    <h4><span class="ico"><carbon-meter /></span>Capacity</h4>
    <p>Workspace em capacity Fabric (F SKU); trial também serve</p>
  </div>
  <div class="tile">
    <h4><span class="ico"><carbon-settings /></span>Tenant setting</h4>
    <p><strong>Fabric apps (preview)</strong> habilitado pelo admin</p>
  </div>
  <div class="tile">
    <h4><span class="ico"><carbon-api-1 /></span>Execute Queries API</h4>
    <p>Data app: setting ligado e permissão <strong>Build</strong> no modelo</p>
  </div>
  <div class="tile">
    <h4><span class="ico"><carbon-user-multiple /></span>Permissão de item</h4>
    <p><strong>Run and interact</strong> para usar · <strong>Edit</strong> para deployar</p>
  </div>
</div>

<!--
Alvo: 00:09.
História real de todo preview: a demo falha por pré-requisito, não por código.
Região primeiro, porque para plateia brasileira é a primeira pergunta: 19 regiões,
Brazil South fora. A saída prática: uma capacity multi-geo só para o workspace do
app; os modelos semânticos podem continuar onde estão, o data app cruza workspaces
por ID. O Receita Saudável roda em Central US.
Fonte: learn.microsoft.com/fabric/admin/region-availability, 7 set 2026.
Capacity: sem F SKU não existe item. O toggle do admin vale para a organização ou
para grupos de segurança. Novo em relação ao que a maioria sabe: o data app usa a
API executeQueries, que tem o PRÓPRIO tenant setting em Integration settings;
esquecer isso dá erro silencioso nos visuais. Permissão de item é outra camada: a
pessoa é membro do workspace e toma 403.
-->
