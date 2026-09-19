---
layout: shot
image: /06-done-matrix.png
caption: Done · Matriz de projetos · item "done" aberto no portal do Fabric, tema escuro · dados 100% sintéticos
alt: App Done mostrando a matriz colapsável de clientes, projetos e features dentro do portal do Fabric
---

###### 05 · Demo, sem rede

# Done: o app é *dono* do dado

<!--
Alvo: 00:33.
Decisão consciente: preview, região, tenant setting, rede de evento; quatro pontos
de falha para um demo ao vivo de três minutos. As capturas provam o mesmo ponto e
o código nos slides anteriores é a demo de verdade. O código dos dois apps é público.
Não é mock nem hospedagem à parte: é um item do workspace, com SQL database, auth e
hosting nascidos do mesmo rayfin up. Hierarquia Client > Project > Feature > Task,
horas consumidas contra previstas, vermelho quando estoura.
As regras (projeto não conclui com feature aberta, cliente inativo não recebe task,
toda alteração gera log) são TypeScript versionado, não trigger no portal.
30 clientes, 40 projetos, 400 tasks, tudo sintético com CNPJ de dígito válido.
-->

---
layout: shot
image: /06-done-analytics.png
caption: Done · Analytics com cross-filter entre visuais · tema claro · cerca de 750 linhas escritas à mão
alt: Tela Analytics do app Done com KPIs, gráfico de horas por mês e painel de filtros
---

# O que o report dá de graça, o app *cobra*

<!--
Alvo: 00:34.
Clicar numa barra cruza o filtro nos demais visuais, como no Power BI. Aqui isso
custou cerca de 750 linhas, incluindo a regra de que cada visual ignora a seleção
da própria dimensão. É o melhor argumento da palestra sobre o preço de sair do report,
e vai voltar daqui a dois slides.
-->

---

# Receita Saudável: o app *lê* dois modelos

<div class="tiles" style="--cols: 4; margin-top: 0.8rem;">
  <div class="tile"><h4><span class="ico"><carbon-dashboard /></span>Visão executiva</h4><p>Venda e recebimento no mesmo período</p></div>
  <div class="tile tile--acc"><h4><span class="ico"><carbon-warning-alt /></span>Clientes em risco</h4><p>Vende muito, paga mal</p></div>
  <div class="tile"><h4><span class="ico"><carbon-user-avatar /></span>Por vendedor</h4><p>Receita com maior risco financeiro</p></div>
  <div class="tile"><h4><span class="ico"><carbon-globe /></span>Região e segmento</h4><p>Vende muito, recebe pouco</p></div>
</div>

<div class="strip" style="margin-bottom: 0.5rem;">
  <span class="ico"><carbon-filter /></span>
  <span>Filtro de ano, região e segmento dispara <strong>DAX nova</strong> nos dois modelos</span>
</div>
<div class="strip" style="margin-bottom: 0.5rem;">
  <span class="ico"><carbon-calculation /></span>
  <span>Nenhuma medida reescrita: <code>[Receita Líquida]</code> e <code>[% Inadimplência]</code> vêm do modelo</span>
</div>
<div class="strip" style="margin-bottom: 0.5rem;">
  <span class="ico"><carbon-launch /></span>
  <span>Aberto fora do portal: aviso, não erro</span>
</div>

<p class="credit">Código, modelos .pbip em TMDL e dados sintéticos da Nexora Distribuidora: github.com/alisonpezzott/fabric-app-receita-saudavel</p>

<!--
Alvo: 00:35.
TODO antes do evento: capturar duas telas do Receita Saudável no portal (Visão
executiva e Clientes em risco), conferir que só há dado sintético, salvar em
public/06-rs-*.png e trocar este slide por dois slides `layout: shot`.
Se houver rede: reativar o slide seguinte (remover `hide: true`) com o vídeo.
-->

---
layout: full
hide: true
---

<Youtube id="0oec-1s-T_Y" width="980" height="551" />

<!--
Slide oculto. Só reativar (remover `hide: true`) se a rede do evento for confiável.
Vídeo: "Criei um Fabric App com 2 Modelos Semânticos usando Rayfin".
-->

---

# O que a demo prova

<div class="compare" style="margin-top: 0.6rem;">
  <div class="panel panel--acc">
    <h4><span class="ico"><carbon-add /></span>Você ganha</h4>
    <ul class="plus">
      <li>Tema e tipografia próprios</li>
      <li>Telas que o report não tem: kanban, "a vencer", formulário com regra</li>
      <li>Regras de negócio com code review</li>
      <li>Dois modelos numa pergunta só</li>
    </ul>
  </div>
  <div class="vs">×</div>
  <div class="panel">
    <h4><span class="ico"><carbon-subtract /></span>Você paga</h4>
    <ul class="minus">
      <li>O cross-filter: cerca de 750 linhas à mão</li>
      <li>Ordenação, estado vazio, loading, erro: todos seus</li>
      <li>Um repositório TypeScript com build e deploy para manter</li>
      <li>E o segundo ano de manutenção</li>
    </ul>
  </div>
</div>

<p class="strip strip--plain"><strong>Report é o default; app é exceção com dono.</strong> Se você não sabe quem mantém esse código daqui a um ano, a resposta já é report.</p>

<!--
Alvo: 00:36:30.
O slide mais honesto da palestra. Dizer o preço em voz alta compra credibilidade
para o resto. Cross-highlight vem de graça em qualquer report; aqui foi reconstruído.
Regra de bolso: report é o default; app é exceção com dono. Se você não sabe o nome
de quem mantém esse código daqui a um ano, a resposta já é report.
-->
