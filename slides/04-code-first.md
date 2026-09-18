---
layout: section
---

###### 02

# Code-first

Da classe TypeScript à tabela SQL, à API GraphQL e ao client tipado — sem passar pelo portal.

<div class="ghost">02</div>

<!--
Alvo: 00:15.
Detalhe que engenheiro aprecia: a doc do Rayfin é travada na versão instalada —
`npx rayfin docs search '<tema>'` responde pela SUA versão, não pela do blog.
-->

---

# De classe a tabela

````md magic-move {lines: true}
```ts
// A plain TypeScript class...
export class Customer {
  name = '';
  taxId = '';
  isActive = true;
}
```

```ts
// ...becomes a SQL table, a GraphQL API and a typed client
import { entity, text, boolean } from '@microsoft/rayfin-core';

@entity()
export class Customer {
  @text({ min: 1, max: 200 }) name!: string;
  @text({ max: 18, unique: true }) taxId!: string;
  @boolean({ default: true }) isActive!: boolean;
}
```

```ts
// The plan the app owns points at the customer the model knows
import { entity, decimal, date, one } from '@microsoft/rayfin-core';

import { Customer } from './Customer.js';

@entity()
export class CollectionPlan {
  @one(() => Customer) customer!: Customer;   // FK column: customer_id
  @decimal() targetAmount!: number;
  @date() dueDate!: Date;
}
```
````

<!--
Alvo: 00:15:30. O único magic-move do deck, no ponto central da palestra.
[click] Decorators TC39 Stage 3 transformam a classe em schema. NUNCA habilitar
experimentalDecorators no tsconfig — é o erro nº 1 de quem vem de Angular ou NestJS.
@text no MSSQL sempre com max: NVARCHAR(MAX) quebra a geração do schema GraphQL e
não indexa.
[click] @one com arrow lazy e import real (não `import type`): a FK vira a coluna
customer_id. Toda entity tem PK uuid `id`, gerada se você não declarar. Sem chave
composta, sem many-to-many — a doc manda usar entity de junção.
-->

---
layout: statement
---

# Entity sem decorator de permissão libera CRUD para *qualquer* usuário autenticado

Silencioso: não dá erro, não dá warning. Só funciona — para todo mundo.

<!--
Alvo: 00:17.
Pausa. É o erro de segurança silencioso do formato. O default é `authenticated`
com asterisco. Declarar a permissão, mesmo quando ela é aberta, é o que separa
decisão de acidente.
-->

---

# Permissão declarada na *entity*

<<< @/snippets/policy.ts#policy ts {1-5|6-8|9-13|all}{lines:true}

<!--
Alvo: 00:17:30.
[click] `@role` com policy: claims do token comparados com colunas da linha. É RLS
declarada em código, versionada, com code review. Desde agosto a policy aceita
`.and()` e `.or()` — aqui: gerente OU dono da linha.
[click] Um segundo `@role` para a mesma role, outra ação: só gerente apaga.
Também existe `include`/`exclude` por campo: o cliente cria `title` mas não toca
em `adminNotes`.
[click] `owner_id` é `@text()` preenchido com `claims.sub` — a doc proíbe `@one()`
apontando para a entity de sistema USER.
[click] E `anonymous` existe como role desde agosto, atrás de um tenant setting
próprio: leitura pública ou formulário de feedback sem login.
-->

---

# O client é *tipado* pelo mesmo schema

<<< @/snippets/query.ts#query ts {4-8|11-12|all}{lines:true}

<!--
Alvo: 00:19.
[click] Cadeia fluente: select → where → orderBy → execute. O `where` é
`{ campo: { operador: valor } }`, nunca `{ campo: valor }`. Campo inexistente é erro
de compilação — o schema.ts que registra as entities é o que dá o tipo.
[click] `findById` para um registro; `.first(n).executePaginated()` para cursor.
Limitações honestas do preview: sem `count()` (use `results.length`), sem SQL direto —
tudo passa pela GraphQL gerada pelo Data API Builder.
-->

---

# Evolução de schema é um *deploy*, não um script de DBA

<v-clicks>

- Mudou a entity? `npx rayfin up` — o schema segue o código
- `up --dry-run --verbose` mostra o plano antes de tocar em qualquer coisa
- Adicionar coluna passa; **renomear, mudar tipo ou remover** é bloqueado
- `up db apply --force` libera o destrutivo — decisão revisada, nunca hábito
- O portal não participa: mexer no banco por fora é sobrescrito no próximo `up`

</v-clicks>

<!--
Alvo: 00:20.
Fechamento do arco code-first: a migração é um deploy. E o contrapeso honesto: por
isso mesmo alguém precisa saber ler o diff do schema no PR.
A doc de troubleshooting de agosto é explícita: rename, alter type e drop não são
suportados sem `--force`, e `--force` pode perder dado. Rollback é `git checkout`
do commit anterior e `up` de novo.
-->

---

# Do zero ao deploy em *cinco* comandos

```bash {1-2|4|5|6|7|all}{lines:false}
npm create @microsoft/rayfin@latest -- receita-saudavel \
  --template dataapp --workspace <workspace>

npm run dev            # backend no Fabric + Vite local
npx rayfin login       # Entra ID, interativo; service principal para CI
npx rayfin up          # build + schema + publish: o comando canônico
npx rayfin up status   # saúde do endpoint depois de todo deploy
```

<!--
Alvo: 00:21.
[click] Scaffold: `--template` aceita bundled (blankapp, dataapp, gettingstartedauth,
todoapp) ou uma URL git — a galeria awesome-rayfin tem 15 templates. O `--workspace`
é validado contra o tenant.
[click] Detalhe que surpreende: `npm run dev` NÃO sobe backend local — ele roda
`rayfin up --exclude-services staticHosting` e depois o Vite. O backend já está no
Fabric; só o frontend é local. No 1.35 existe `rayfin dev --provider docker` para
quem quer tudo local.
[click] Login interativo; o service principal volta no slide de CI/CD.
[click] `rayfin up` é a resposta para "como eu deployo", inclusive schema.
[click] `up status`: custo zero, conferir sempre.
-->
