###### 02 · Duas formas de app

# Duas formas de app, um só CLI

<div class="compare" style="margin-top: 0.5rem;">
  <div class="panel">
    <h4><span class="ico"><carbon-db2-database /></span>O app é <em>dono</em> do dado</h4>
    <div class="tags"><span class="tag tag--acc">data.enabled: true</span><span class="tag">dialect: mssql</span></div>
    <ul>
      <li>Entities em <code>rayfin/data/*.ts</code>: SQL DB + GraphQL + client tipado</li>
      <li>Dado que <strong>nasce no app</strong>: formulários, filas, planos, estado de agente</li>
    </ul>
    <p class="foot">o Done</p>
  </div>
  <div class="vs">ou</div>
  <div class="panel">
    <h4><span class="ico"><carbon-chart-line /></span>O app <em>lê</em> o estado analítico</h4>
    <div class="tags"><span class="tag tag--acc">data.enabled: false</span><span class="tag">template dataapp</span></div>
    <ul>
      <li>Nenhum banco: <strong>DAX</strong> nos modelos que o BI já governa</li>
      <li>Sem segunda cópia, sem segundo modelo de segurança: a <strong>RLS do modelo</strong> vale</li>
    </ul>
    <p class="foot">o Receita Saudável</p>
  </div>
</div>

<p class="strip strip--plain">A fronteira não é técnica: é operacional × analítico. Misturar as duas, quando o processo pede, é legítimo.</p>

<!--
Alvo: 00:11.
Esta é a decisão nº 1 de qualquer projeto de Fabric App, e o rayfin.yml registra a
escolha numa linha: data.enabled. Esquerda: o Done. Direita: o Receita Saudável.
No yml: data.enabled: true com dialeto mssql (hoje só SQL Server no Fabric);
auth.fabric.enabled: true é obrigatório para deployar, sem auth o up recusa. No data
app, data.enabled: false: nenhum SQL database é provisionado e o custo em CU cai
junto; o buildCommand regenera o fabric.generated.ts antes do Vite, editar o
fabric.yaml sem rebuild não muda nada. Toda string aceita ${VAR} e ${VAR:-default}
resolvidos de rayfin/.env.
A frase de baixo é a que vale anotar: não é "com banco ou sem banco"; é "quem é
dono desse dado?". Se o BI já governa, o app lê. Se o processo cria, o app é dono.
-->

---

# A forma híbrida: lê o modelo, grava o *plano*

```mermaid
flowchart LR
  SM[("Modelos semânticos<br/>Comercial · Financeiro")] -- "DAX · executeQueries" --> APP["Fabric App"]
  APP -- "GraphQL · client.data" --> DB[("SQL database<br/>planos, metas, notas")]
  DB -. "espelhamento automático" .-> OL[("OneLake · Delta")]
  OL -. "Direct Lake" .-> SM
  classDef acc stroke:#2dd4bf,stroke-width:1.5px
  class APP acc
```

<p class="strip strip--plain">Lê o que o BI governa, grava o que o processo cria, e o que gravou volta ao modelo <strong>sem ETL</strong>: o SQL database in Fabric já vive no OneLake.</p>

<!--
Alvo: 00:13.
É o desenho que responde ao "planejamento" do título: o time vê a receita por
cliente (modelo), define o plano de cobrança (entity do app), e o plano aparece
no próprio modelo na próxima frame do Direct Lake.
Nenhuma segunda cópia da receita; nenhuma planilha paralela. É exatamente o buraco
do primeiro slide fechado dentro da plataforma.
-->
