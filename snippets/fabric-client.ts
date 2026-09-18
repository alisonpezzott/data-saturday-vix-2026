import {
  SemanticModelMessageClient,
} from '@microsoft/fabric-app-data-embed-client';
import { FabricClient } from '@microsoft/fabric-app-data';
import { EmbedFabricApiProxy } from '@microsoft/fabric-app-data-proxy';
import { fabricConfig } from '@/fabric.generated';   // from fabric.yaml

// #region client
let client: FabricClient | undefined;

export function getFabricClient(): FabricClient {
  if (!client) {
    const host = new SemanticModelMessageClient();  // Fabric host, postMessage
    client = new FabricClient({
      proxy: new EmbedFabricApiProxy(host),         // runs DAX host-side
      ...fabricConfig,                              // aliases from fabric.yaml
      daxProtocol: 'arrow',                         // or 'json' (the default)
    });
  }
  return client;
}
// #endregion client
