import { useCallback, useEffect, useState } from 'react';
import type { CachedQueryResult } from '@microsoft/fabric-app-data';
import { getFabricClient } from '@/lib/fabric-client';

// #region hook
export function useSemanticModelQuery(opts: Options) {
  const { connection, query, bypassCache } = opts;
  const [data, setData] = useState<CachedQueryResult>();
  const [isLoading, setIsLoading] = useState(false);
  const execute = useCallback(async () => {
    setIsLoading(true);
    const result = await getFabricClient()
      .semanticModel(connection)          // alias from fabric.yaml
      .query(query, { bypassCache });     // LRU cache; never throws
    setData(result);                      // result.status: 'success' | 'error'
    setIsLoading(false);
  }, [connection, query, bypassCache]);
  useEffect(() => { execute(); }, [execute]);
  return { data, isLoading, refetch: execute };
}
// #endregion hook

interface Options {
  connection: string;
  query: string;
  bypassCache?: boolean;
}
