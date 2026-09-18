import { getRayfinClient } from './rayfin-client';

// #region query
export async function openPlans(customerId: string) {
  const client = getRayfinClient();

  return client.data.CollectionPlan
    .select(['id', 'targetAmount', 'dueDate', 'owner_id'])
    .where({ customer_id: { eq: customerId } })   // { field: { op: value } }
    .orderBy({ dueDate: 'asc' })
    .execute();
}

// One record by primary key:
// const plan = await client.data.CollectionPlan.findById(id);
// #endregion query
