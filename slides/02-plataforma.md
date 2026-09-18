---
layout: section
---

###### 01

# A plataforma

O que o Rayfin é, o que o Fabric Apps é, e o que acontece de verdade quando você roda `rayfin up`.

<div class="ghost">01</div>

<!--
Alvo: 00:04:30.
-->

---

# Rayfin e Fabric Apps *não* são a mesma coisa

|  | Rayfin | Fabric Apps |
| :--- | :--- | :--- |
| O que é | SDK + CLI **open source** (MIT), TypeScript | **Workload** do Fabric que executa o backend |
| Onde vive | `github.com/microsoft/rayfin` · 14 pacotes `@microsoft/rayfin-*` | Item **App** no workspace, com serviços filhos |
| Hoje | CLI **1.35.0**, publicado em 9 de setembro | Preview desde **2 jun 2026** · GA prevista para o fim de 2026 |
| Papel | Declara dados, políticas, auth e hosting **em código** | Provisiona SQL DB, GraphQL, SSO e hosting no OneLake |

<p class="credit">"Fabric Apps isn't an app builder, it's a backend as a service." — Sachin Patney, PM Lead de app development no Fabric · Fabric Insider ep. 11, ago 2026</p>

<!--
Alvo: 00:05.
Separar os dois nomes economiza dez perguntas depois. Rayfin é a peça de código,
aberta, que você instala do npm; Fabric Apps é onde ela roda como serviço gerenciado.
A frase do Sachin é a mais importante do slide: não é um app builder. Não compete
com Power Apps no "arrastar tela"; compete com Supabase e Firebase no backend.
GA "fim de 2026" é declaração do PM Lead e do AMA oficial — não é data na doc.
-->

---

# Um item, três serviços filhos

| Serviço filho | O que entrega | No portal |
| :--- | :--- | :--- |
| **SQL database in Fabric** | Schema gerado dos decorators; espelhado no OneLake | Query editor **read-only**: schema vem do código |
| **Authentication** | Fabric brokered auth com Entra ID (SSO) | Tabela de usuários autenticados |
| **Static content** | Frontend buildado, servido do OneLake | URL pública do app |

<v-click>

Um único backend serve tudo: `/api/graphql` para dados, `/auth` para sessão, `/storage` para arquivos.

</v-click>

<!--
Alvo: 00:06:30.
O banco é read-only no portal DE PROPÓSITO: mudança de schema vem do código.
Quem mexer pelo query editor gera conflito e pode quebrar o app — está na doc de
troubleshooting, não é opinião. E o SQL database in Fabric já espelha para o OneLake:
o que o app grava aparece em Delta sem pipeline.
[click] Endpoint único: `https://<app>-app.rayfin.windows.net`. O frontend é servido
de outra URL, em `webapp.fabricapps.net`, também atrás do SSO.
-->

---

# O que acontece em um `rayfin up`

<v-clicks>

1. Cria o item **App** no workspace, ou reusa o existente
2. Busca a **publishable key** (`pk-*`, a única chave segura no client)
3. Sincroniza o `rayfin.yml`: auth, serviços, redirect URIs
4. Aplica o **schema** gerado dos decorators no SQL database
5. Roda o `buildCommand`, empacota em ZIP (≤ 100 MB) e publica no OneLake
6. Grava `rayfin/.env` e `.env.fabric-<workspace>` para o próximo deploy

</v-clicks>

<!--
Alvo: 00:07:30.
Seis passos, na ordem da doc de deploy. O que importa para engenheiro:
[click] idempotente — segundo `up` atualiza o mesmo item.
[click] a publishable key é o que vai para o bundle; nada além dela.
[click] o yml é sincronizado ANTES do schema.
[click] schema: só o que for não-destrutivo passa sem `--force`.
[click] o limite de 100 MB pega quem embute vídeo no bundle.
[click] o `.env` é um ponteiro para o deployment ativo, não fonte da verdade.
Primeiro deploy: 2 a 5 minutos. Só estático: 30 a 60 segundos (FAQ oficial).
-->

---

# Pré-requisitos que *mordem*

<v-clicks>

- Workspace em **capacity Fabric** (F SKU); trial também serve
- Tenant setting **Fabric apps (preview)** habilitado pelo admin
- Data app: setting **Semantic Model Execute Queries REST API** ligado e permissão **Build** no modelo
- Papel de workspace não basta: **Run and interact** para usar o app, **Edit** para deployar

</v-clicks>

<!--
Alvo: 00:09.
História real de todo preview: a demo falha por pré-requisito, não por código.
[click] Capacity: sem F SKU não existe item.
[click] O toggle do admin — para a organização ou para grupos de segurança.
[click] Novo em relação ao que a maioria sabe: o data app usa a API executeQueries,
que tem o PRÓPRIO tenant setting em Integration settings. Esquecer isso dá erro
silencioso nos visuais.
[click] Permissão de item é outra camada: a pessoa é membro do workspace e toma 403.
-->

---
layout: fact
---

# 19 <small>regiões</small>

Fabric Apps roda em 19 regiões hoje. **Brazil South ainda não.**

Recomendação oficial no AMA: West US 2 ou North Central US · lista atualizada em 7 de setembro de 2026

<!--
Alvo: 00:10.
Para plateia brasileira isso é a primeira pergunta. A saída prática: uma capacity
multi-geo só para o workspace do app; os modelos semânticos podem continuar onde
estão — o data app cruza workspaces por ID.
O Receita Saudável roda em Central US. Fonte: learn.microsoft.com/fabric/admin/region-availability.
-->
