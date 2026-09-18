import {
  entity, role, uuid, text, decimal,
} from '@microsoft/rayfin-core';

// #region policy
@entity()
@role('authenticated', ['create', 'read', 'update'], {
  policy: (claims, item) =>
    claims.role.eq('manager').or(claims.sub.eq(item.owner_id)),
})
@role('authenticated', 'delete', {
  policy: (claims, _item) => claims.role.eq('manager'),
})
export class CollectionPlan {
  @uuid() id!: string;
  @decimal() targetAmount!: number;
  @text() owner_id!: string; // claims.sub — never @one() to the USER entity
}
// #endregion policy
