###### 07 · Deploy, custo e governança

# O que consome *CU*

<div class="compare" style="grid-template-columns: 2.4fr auto 1fr; margin-top: 0.4rem;">
  <div class="panel">
    <h4><span class="ico"><carbon-money /></span>Cobra, na capacity do app</h4>
    <div class="tiles" style="--cols: 3; margin: 0;">
      <div class="tile">
        <h4>SQL database</h4>
        <p><strong>Interactive:</strong> queries e mutações, também as da GraphQL</p>
        <p class="foot">Background: storage · 1 CU = 0,383 vCore</p>
      </div>
      <div class="tile">
        <h4>GraphQL API</h4>
        <p><strong>Interactive:</strong> query e mutation do client</p>
        <p class="foot">10 CU por hora de processamento</p>
      </div>
      <div class="tile">
        <h4>OneLake</h4>
        <p><strong>Background:</strong> servir, publicar e guardar os estáticos</p>
        <p class="foot">o único custo de um data app</p>
      </div>
    </div>
  </div>
  <div class="vs">≠</div>
  <div class="panel panel--acc">
    <h4><span class="ico"><carbon-checkmark /></span>Não cobra à parte</h4>
    <ul class="check">
      <li>hosting do app</li>
      <li>autenticação</li>
      <li>o próprio <code>rayfin up</code></li>
    </ul>
    <p class="foot">a DAX do data app conta no modelo</p>
  </div>
</div>

<p class="credit">learn.microsoft.com/fabric/apps/pricing, atualizada em 7 jul 2026 · tudo aparece no Capacity Metrics App, por item e por operação</p>

<!--
Alvo: 00:40:30.
Pergunta top 3 de qualquer cliente. 1 CU equivale a 0,383 vCore de SQL database.
Tudo aparece no Capacity Metrics App por item e por operação.
O que NÃO cobra é tão importante quanto o que cobra. E o detalhe do data app: sem
SQL database o app custa quase nada; a query DAX é cobrada onde sempre foi, na
capacity do modelo semântico.
Fonte: learn.microsoft.com/fabric/apps/pricing, atualizada em 7 jul 2026. Reconferir
na véspera: é preview.
-->

---

# SSO e o que ele *não* protege

<div class="tiles" style="--cols: 3; margin-top: 1rem;">
  <div class="tile tile--acc">
    <h4><span class="ico"><carbon-locked /></span>Protegido pelo SSO</h4>
    <p><strong>Quem entra no app.</strong> Depois do deploy, Entra ID é o único provider; compartilhar exige Run and interact no item.</p>
    <p class="foot">sem auth habilitada, o up recusa o deploy</p>
  </div>
  <div class="tile">
    <h4><span class="ico"><carbon-view /></span>Público</h4>
    <p><strong>O bundle estático,</strong> servido de URL pública. Segredo nenhum no frontend; só a publishable key <code>pk-*</code>.</p>
    <p class="foot">chave de API no frontend é pública, ponto</p>
  </div>
  <div class="tile tile--ghost">
    <h4><span class="ico"><carbon-laptop /></span>Só no dev local</h4>
    <p><strong>E-mail e senha</strong> existem antes do deploy, e só. Auth local ≠ auth brokered: mesmo app, dois provedores.</p>
    <p class="foot">convidado B2B não está na doc</p>
  </div>
</div>

<!--
Alvo: 00:42.
Quem já sofreu com "funciona local, não funciona deployado": auth local ≠ auth
brokered. Mesmo app, dois provedores.
O tile do meio é o que mais gera pergunta: SSO controla quem ENTRA, não o que o
bundle carrega. Chave de API no frontend está pública, ponto.
Roadmap declarado no AMA: OIDC para identidade externa e apps anônimos; o tenant
setting de acesso anônimo a DADOS já existe desde agosto.
-->

---

# CI/CD: agora com *service principal*

<<< @/snippets/deploy-to-fabric.yml yaml {1-4|5|12-17|all}{lines:true}

<!--
Alvo: 00:43:30.
É a maior mudança desde junho para quem faz governança. A doc "Deploy a Fabric app
with GitHub Actions" traz o workflow oficial, e o help do CLI 1.35 não marca mais o
service principal como "não suportado".
[click] Push em main deploya; `workflow_dispatch` com a caixa `force` para mudança
destrutiva revisada.
[click] `concurrency` por branch: dois `up` nunca correm no mesmo workspace.
[click] Login com client id, tenant e secret dos GitHub Secrets; `up --workspace --yes`.
O SP precisa de Contributor no workspace e do tenant setting que libera SP nas APIs.
Honestidade: a referência do CLI de junho ainda dizia "not supported". Testar no
seu tenant antes de prometer ao cliente.
-->

---

# Dev e prod são *workspaces*

<div class="flow" style="margin-top: 1.2rem; align-items: center;">
  <div class="node" style="flex: 0.85;">
    <span class="ico"><carbon-branch /></span>
    <strong>Um repositório</strong>
    <small><code>rayfin/.env</code> aponta para o deployment ativo: não é fonte da verdade, não vai para o Git</small>
  </div>
  <div class="arrow arrow--label" data-label="up --workspace"></div>
  <div class="stack">
    <div class="node"><span class="ico"><carbon-workspace /></span><div><strong>app-dev</strong><small><code>npx rayfin up --workspace app-dev</code> · perfil dev do <code>fabric.yaml</code> aponta para modelos de dev</small></div></div>
    <div class="node node--acc"><span class="ico"><carbon-workspace /></span><div><strong>app-prod</strong><small><code>npx rayfin up --dry-run --verbose</code> antes de qualquer up · service principal via GitHub Actions</small></div></div>
  </div>
</div>

<div class="tags">
  <span class="tag">up list</span>
  <span class="tag">up switch app-dev</span>
  <span class="tag">up db apply · só schema</span>
  <span class="tag">up staticapp deploy · só frontend, 30 a 60 s</span>
</div>

<!--
Alvo: 00:45.
Mesmo projeto, dois workspaces, dois itens. O .env é ponteiro para o deployment
ativo, não é fonte da verdade, não vai para o Git. `up list` mostra os deployments
registrados; `up switch` troca o alvo sem redigitar IDs.
Higiene de prod: --dry-run antes, subcomandos para deploy parcial (db apply para só
schema, staticapp deploy para só frontend, 30 a 60 segundos).
Perfis do fabric.yaml fazem o mesmo para os modelos: dev aponta para modelos de dev,
prod para os certificados.
-->
