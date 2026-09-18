import { initEmbeddedAuth } from '@microsoft/rayfin-auth-provider-fabric';
import { client } from '@/lib/rayfin-client';

// #region embedded
// Inside the Fabric iframe (?fabricEmbedded=true) the session arrives through
// postMessage from the host: no popup, no user gesture, safe on page load.
const session = await initEmbeddedAuth(client.auth, {
  workspaceId: import.meta.env.VITE_FABRIC_WORKSPACE_ID,
  projectId: import.meta.env.VITE_FABRIC_ITEM_ID,
  fabricPortalUrl: import.meta.env.VITE_FABRIC_PORTAL_URL,
  returnOrigin: window.location.origin,  // bare origin, checked per message
});

if (session === null) showOpenInFabricNotice();  // standalone tab: not an error
// #endregion embedded

declare function showOpenInFabricNotice(): void;
