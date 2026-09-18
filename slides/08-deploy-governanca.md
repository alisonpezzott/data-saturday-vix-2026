---
layout: section
---

###### 06

# Deploy, custo e governança

A parte que separa a demo bonita do app que pode existir na empresa.

<div class="ghost">06</div>

<!--
Alvo: 00:41.
-->

---

# O que consome CU

| Serviço | Operação | Tipo |
| :--- | :--- | :--- |
| SQL database | queries e mutações — **inclusive as da GraphQL API** e do query editor | Interactive |
| SQL database | armazenamento de tabelas, índices e logs | Background |
| GraphQL API | query e mutation do `RayfinClient` · **10 CU por hora** de processamento | Interactive |
| OneLake | servir, publicar e armazenar os estáticos | Background |

<v-click>

**Não** cobram CU à parte: o serviço de hosting do app, a autenticação e o próprio `rayfin up`. Data app sem banco: só OneLake — e a DAX conta no **modelo**.

</v-click>

<!--
Alvo: 00:41:30.
Pergunta top 3 de qualquer cliente. 1 CU equivale a 0,383 vCore de SQL database.
Tudo aparece no Capacity Metrics App por item e por operação.
[click] O que NÃO cobra é tão importante quanto o que cobra. E o detalhe do data app:
sem SQL database o app custa quase nada; a query DAX é cobrada onde sempre foi —
na capacity do modelo semântico.
Fonte: learn.microsoft.com/fabric/apps/pricing, atualizada em 7 jul 2026. Reconferir
na véspera: é preview.
-->

---

# SSO e o que ele *não* protege

<v-clicks>

- Depois do deploy, **Entra ID é o único provider**: e-mail e senha só existem no dev local
- Sem auth habilitada o `rayfin up` **recusa** o deploy
- O SSO protege o **app**, não o seu bundle: o estático é servido de URL pública
- Segredo nenhum no frontend; só a publishable key `pk-*`
- Compartilhar exige **Run and interact** no item; convidado B2B não está na doc

</v-clicks>

<!--
Alvo: 00:43.
Quem já sofreu com "funciona local, não funciona deployado": auth local ≠ auth
brokered. Mesmo app, dois provedores.
[click] A terceira bala é a que mais gera pergunta: SSO controla quem ENTRA, não o
que o bundle carrega. Chave de API no frontend está pública, ponto.
[click] Roadmap declarado no AMA: OIDC para identidade externa e apps anônimos — o
tenant setting de acesso anônimo a DADOS já existe desde agosto.
-->

---

# CI/CD: agora com *service principal*

<<< @/snippets/deploy-to-fabric.yml yaml {1-4|5|12-17|all}{lines:true}

<!--
Alvo: 00:44.
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

```bash {1-2|4-5|7-9|all}{lines:false}
npx rayfin up --workspace app-dev        # cria o item em dev
npx rayfin up --workspace app-prod       # segundo item, segundo deployment

npx rayfin up list                       # deployments registrados
npx rayfin up switch app-dev             # reescreve rayfin/.env

npx rayfin up --dry-run --verbose        # antes de qualquer up em prod
npx rayfin up db apply                   # só schema
npx rayfin up staticapp deploy           # só frontend, 30 a 60 s
```

<!--
Alvo: 00:45:30.
[click] Mesmo projeto, dois workspaces, dois itens. O `.env` é ponteiro para o
deployment ativo — não é fonte da verdade, não vai para o Git.
[click] `switch` troca o alvo sem redigitar IDs.
[click] Higiene de prod: `--dry-run` antes, subcomandos para deploy parcial.
Perfis do `fabric.yaml` fazem o mesmo para os modelos: dev aponta para modelos de
dev, prod para os certificados.
-->
