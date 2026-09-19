# O report mostra o número. A ação acontece *fora*

<div class="flow" style="margin-top: 1.6rem; align-items: center;">
  <div class="node node--acc" style="flex: 0.9;">
    <span class="ico"><carbon-dashboard /></span>
    <strong>Report</strong>
    <small>responde "quanto"</small>
  </div>
  <div class="arrow arrow--label" data-label="e agora?"></div>
  <div class="stack" v-click>
    <div class="node"><span class="ico"><carbon-app /></span><div><strong>Power Apps</strong><small>resolve, mas fora da plataforma de dados</small></div></div>
    <div class="node"><span class="ico"><carbon-code /></span><div><strong>Web app próprio</strong><small>infra, auth, deploy e hosting por sua conta</small></div></div>
    <div class="node"><span class="ico"><carbon-data-table /></span><div><strong>Planilha paralela</strong><small>o plano C de todo time</small></div></div>
  </div>
  <div class="arrow" v-after></div>
  <div class="node node--ghost" style="flex: 0.9;" v-click>
    <span class="ico"><carbon-warning-alt /></span>
    <strong>Dado operacional</strong>
    <small>nasce fora da governança do Fabric</small>
  </div>
</div>

<!--
Alvo: 00:01.
O painel responde "quanto"; alguém precisa FAZER algo com isso, e o caminho da
ação sempre sai da plataforma.
[click] As três saídas que a plateia já viveu. Pedir mão levantada na planilha
paralela: sempre sobe metade da sala, e é o gancho da palestra inteira.
[click] O resultado: o dado operacional nasce fora da governança do Fabric.
O ponto não é que faltava ferramenta de leitura. Faltava caminho de ESCRITA e de
APLICAÇÃO dentro da plataforma.
O "porquê agora" entra no próximo bloco: vibe coding resolveu o Day 1; ninguém
tinha resolvido o Day 2 corporativo (identidade, permissão, auditoria, onde o dado
fica). Amir Netz na Build 2026, ao The New Stack: "não dá para deixar qualquer
pessoa construir app full-stack na empresa; o que queremos é que, quando construam,
o deploy seja seguro e compliant para a organização."
-->

---
layout: statement
---

# E se o app fosse um *item do workspace*, como um Lakehouse ou um report?

<!--
Alvo: 00:03.
Pausa de verdade. Essa frase é a premissa; o resto são consequências dela.
Deixar o silêncio trabalhar dois segundos antes de avançar.
-->
