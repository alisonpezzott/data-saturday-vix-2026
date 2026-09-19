###### 03 · Code-first

# De classe a tabela, a API e a client *tipado*

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
Alvo: 00:15. O único magic-move do deck, no ponto central da palestra.
Detalhe que engenheiro aprecia: a doc do Rayfin é travada na versão instalada;
`npx rayfin docs search '<tema>'` responde pela SUA versão, não pela do blog.
[click] Decorators TC39 Stage 3 transformam a classe em schema. NUNCA habilitar
experimentalDecorators no tsconfig; é o erro nº 1 de quem vem de Angular ou NestJS.
@text no MSSQL sempre com max: NVARCHAR(MAX) quebra a geração do schema GraphQL e
não indexa.
[click] @one com arrow lazy e import real (não `import type`): a FK vira a coluna
customer_id. Toda entity tem PK uuid `id`, gerada se você não declarar. Sem chave
composta, sem many-to-many; a doc manda usar entity de junção.
O client sai do mesmo schema: `client.data.CollectionPlan.select([...]).where({
customer_id: { eq: id } }).orderBy({ dueDate: 'asc' }).execute()`. O where é sempre
`{ campo: { operador: valor } }`; campo inexistente é erro de compilação. `findById`
para um registro, `.first(n).executePaginated()` para cursor. Limitações honestas do
preview: sem count() (use results.length), sem SQL direto, tudo passa pela GraphQL
gerada pelo Data API Builder.
-->

---

# Permissão declarada na *entity*

<div class="strip strip--warn">
  <span class="ico"><carbon-warning-alt /></span>
  <span>Sem <code>@role</code>, qualquer usuário autenticado faz CRUD. Sem erro, sem warning: só funciona, para todo mundo.</span>
</div>

<<< @/snippets/policy.ts#policy ts {1-5|6-8|9-13|all}{lines:true}

<!--
Alvo: 00:17:30.
A faixa em cima é o erro de segurança silencioso do formato: o default é
`authenticated` com asterisco. Declarar a permissão, mesmo quando ela é aberta, é o
que separa decisão de acidente.
[click] `@role` com policy: claims do token comparados com colunas da linha. É RLS
declarada em código, versionada, com code review. Desde agosto a policy aceita
`.and()` e `.or()`; aqui: gerente OU dono da linha.
[click] Um segundo `@role` para a mesma role, outra ação: só gerente apaga.
Também existe `include`/`exclude` por campo: o cliente cria `title` mas não toca
em `adminNotes`.
[click] `owner_id` é `@text()` preenchido com `claims.sub`; a doc proíbe `@one()`
apontando para a entity de sistema USER.
[click] E `anonymous` existe como role desde agosto, atrás de um tenant setting
próprio: leitura pública ou formulário de feedback sem login.
-->

---

# Evolução de schema é um *deploy*, não um script de DBA

<div class="tiles" style="--cols: 3; margin-top: 0.8rem;">
  <div class="tile tile--acc">
    <h4><span class="ico"><carbon-checkmark /></span>Passa</h4>
    <ul class="plus">
      <li>mudança aditiva: entity nova, coluna nova</li>
      <li><code>npx rayfin up</code> e o schema segue o código</li>
    </ul>
    <p class="foot">rollback: git checkout e up de novo</p>
  </div>
  <div class="tile">
    <h4><span class="ico"><carbon-not-available /></span>Bloqueado</h4>
    <ul class="cross">
      <li>renomear coluna</li>
      <li>mudar tipo</li>
      <li>remover</li>
    </ul>
    <p class="foot">o up recusa sem --force</p>
  </div>
  <div class="tile tile--ghost">
    <h4><span class="ico"><carbon-warning-alt /></span>Só com --force</h4>
    <p><code>up db apply --force</code> libera o destrutivo e pode perder dado: decisão revisada no PR, nunca hábito</p>
  </div>
</div>

<div class="strip">
  <span><code>up --dry-run --verbose</code> mostra o plano antes de tocar em qualquer coisa</span>
  <span>Portal read-only: mexer no banco por fora é sobrescrito no próximo <code>up</code></span>
</div>

<!--
Alvo: 00:19:30.
Fechamento do arco code-first: a migração é um deploy. E o contrapeso honesto: por
isso mesmo alguém precisa saber ler o diff do schema no PR.
A doc de troubleshooting de agosto é explícita: rename, alter type e drop não são
suportados sem --force, e --force pode perder dado. Rollback é git checkout do
commit anterior e up de novo.
-->

---

# Do zero ao deploy em *cinco* comandos

<ol class="steps" style="--cols: 5; margin-top: 1.4rem;">
  <li><code>npm create @microsoft/rayfin</code><small>scaffold: template + workspace, validado no tenant</small></li>
  <li><code>npm run dev</code><small>o backend já está no Fabric; só o Vite é local</small></li>
  <li><code>npx rayfin login</code><small>Entra ID interativo; service principal no CI</small></li>
  <li><code>npx rayfin up</code><small>build + schema + publish: o comando canônico</small></li>
  <li><code>npx rayfin up status</code><small>saúde do endpoint depois de todo deploy</small></li>
</ol>

<!--
Alvo: 00:21.
Scaffold: --template aceita bundled (blankapp, dataapp, gettingstartedauth, todoapp)
ou uma URL git; a galeria awesome-rayfin tem 15 templates. O --workspace é validado
contra o tenant.
Detalhe que surpreende: npm run dev NÃO sobe backend local; ele roda
`rayfin up --exclude-services staticHosting` e depois o Vite. O backend já está no
Fabric; só o frontend é local. No 1.35 existe `rayfin dev --provider docker` para
quem quer tudo local.
Login interativo; o service principal volta no slide de CI/CD. `rayfin up` é a
resposta para "como eu deployo", inclusive schema. `up status`: custo zero,
conferir sempre.
-->
