---
layout: two-cols-header
---

# Quem está falando

::left::

- **Head de BI & Analytics** na Power Tuning
- Microsoft **MVP** Data Platform · **MCT**
- Dois Fabric Apps públicos com Rayfin: **Done** e **Receita Saudável**
- YouTube e GitHub: `alisonpezzott`

::right::

<figure class="qr">
  <img src="/01-qr-youtube.png" alt="QR code do canal alisonpezzott no YouTube" />
  <figcaption>youtube.com/@alisonpezzott</figcaption>
</figure>

<!--
Alvo: 00:00:30. Trinta segundos, não mais.
Os dois apps citados voltam como demo gravada e como código nos slides. A plateia
precisa saber desde já que tudo que vai ver existe, está deployado e é público.
O QR é do canal: "quem quiser ver com calma, os dois vídeos sobre Rayfin estão lá."
-->

---

# O report mostra o número. A ação acontece *fora*

<v-clicks>

- O painel responde "quanto"; alguém precisa **fazer** algo com isso
- Power Apps resolve, mas fora da plataforma de dados
- Web app próprio: infra, auth, deploy e hosting por sua conta
- O plano C de todo time: a **planilha paralela**
- Resultado: o dado operacional nasce **fora** da governança do Fabric

</v-clicks>

<!--
Alvo: 00:01.
Cada bala é uma dor que a plateia já viveu. Pedir mão levantada na planilha
paralela — sempre sobe metade da sala, e é o gancho da palestra inteira.
O ponto não é que faltava ferramenta de leitura. Faltava caminho de ESCRITA e de
APLICAÇÃO dentro da plataforma.
-->

---

# Gerar o app ficou fácil. Colocar em *produção*, não

> "Não dá para deixar qualquer pessoa construir app full-stack na empresa. O que
> queremos é que, quando construam, o deploy seja seguro e compliant para a
> organização."
>
> <cite>Amir Netz · CTO do Microsoft Fabric · Build 2026, em entrevista ao The New Stack</cite>

<v-clicks>

- **2 de junho de 2026**, Build: nascem juntos o **Rayfin** (SDK e CLI open source) e o **Fabric Apps** (preview)
- Replit como parceiro de lançamento: "agents write the code, Fabric ships it"
- A tese: o backend do app vive **dentro do data estate**, herdando identidade e governança

</v-clicks>

<!--
Alvo: 00:02:30.
Este é o "porquê agora". Vibe coding resolveu o Day 1; ninguém tinha resolvido
o Day 2 corporativo: identidade, permissão, auditoria, onde o dado fica.
[click] A data e o evento. Preview público, não GA.
[click] A citação do CEO da Replit é curta e resume o modelo: agente escreve,
plataforma entrega.
[click] E a tese que sustenta o resto da palestra.
Fontes: The New Stack (2 jun 2026), Azure Blog do Arun Ulag (2 jun 2026).
-->

---
layout: statement
---

# E se o app fosse um *item do workspace*, como um Lakehouse ou um report?

<!--
Alvo: 00:04.
Pausa de verdade. Essa frase é a premissa; o resto são consequências dela.
Deixar o silêncio trabalhar dois segundos antes de avançar.
-->
