---
layout: section
---

###### 04

# Demo, sem rede

Dois apps deployados, capturados no portal. O código dos dois está público.

<div class="ghost">04</div>

<!--
Alvo: 00:34.
Decisão consciente: preview, região, tenant setting, rede de evento — quatro pontos
de falha para um demo ao vivo de três minutos. As capturas provam o mesmo ponto e
o código nos slides anteriores é a demo de verdade.
Se houver rede boa, o slide oculto com o vídeo do Receita Saudável pode ser reativado.
-->

---
layout: shot
image: /06-done-matrix.png
caption: Done · Matriz de projetos · item "done" aberto no portal do Fabric, tema escuro · dados 100% sintéticos
alt: App Done mostrando a matriz colapsável de clientes, projetos e features dentro do portal do Fabric
---

# Done: o app é *dono* do dado

<!--
Alvo: 00:34:30.
Não é mock nem hospedagem à parte: é um item do workspace, com SQL database, auth e
hosting nascidos do mesmo `rayfin up`. Hierarquia Client > Project > Feature > Task,
horas consumidas contra previstas, vermelho quando estoura.
As regras — projeto não conclui com feature aberta, cliente inativo não recebe task,
toda alteração gera log — são TypeScript versionado, não trigger no portal.
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
Alvo: 00:35.
Clicar numa barra cruza o filtro nos demais visuais, como no Power BI. Aqui isso
custou cerca de 750 linhas — incluindo a regra de que cada visual ignora a seleção
da própria dimensão. É o melhor argumento da palestra sobre o preço de sair do report,
e vai voltar daqui a dois slides.
-->

---
layout: two-cols-header
---

# Receita Saudável: o app *lê* dois modelos

::left::

#### As quatro telas

- **Visão executiva**: KPIs de venda e de recebimento no mesmo período
- **Clientes em risco**: vende muito, paga mal
- **Por vendedor**: receita com maior risco financeiro
- **Por região e segmento**: vende muito, recebe pouco

::right::

#### O que provar na tela

- Filtro de ano, região e segmento dispara **DAX nova** nos dois modelos
- Nenhuma medida reescrita: `[Receita Líquida]` e `[% Inadimplência]` vêm do modelo
- Aberto fora do portal: aviso, não erro

::bottom::

<p class="muted small">Código, modelos .pbip em TMDL e dados sintéticos da Nexora Distribuidora: github.com/alisonpezzott/fabric-app-receita-saudavel</p>

<!--
Alvo: 00:35:30.
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
layout: two-cols-header
---

# O que a demo prova

::left::

#### Você ganha

- Linguagem visual própria, tema, tipografia
- Telas que o report não tem: kanban arrastável, "a vencer", formulário com regra
- Regras de negócio com code review
- Dois modelos numa pergunta só

::right::

#### Você paga

- O cross-filter: cerca de 750 linhas à mão
- Tabela ordenável, estado vazio, loading, erro: todos seus
- Um repositório TypeScript com build e deploy para manter
- E o segundo ano de manutenção

<!--
Alvo: 00:36:30.
A slide mais honesta da palestra. Dizer o preço em voz alta compra credibilidade
para o resto. Cross-highlight vem de graça em qualquer report; aqui foi reconstruído.
Regra de bolso: report é o default; app é exceção com dono. Se você não sabe o nome
de quem mantém esse código daqui a um ano, a resposta já é report.
-->
