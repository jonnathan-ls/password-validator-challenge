/**
 * Interface representing the configuration required for OAuth authentication.
 */
export interface AuthConfig {

    /** The grant type for the OAuth authentication flow (e.g., 'client_credentials') */
    grant_type: string;
  
    /** The client ID used to authenticate the client in the OAuth flow. */
    clientId: string;
  
    /** The client secret used to authenticate the client in the OAuth flow. */
    clientSecret: string;
  
    /** The URL of the resource server where the OAuth token is obtained. */
    resourceServerUrl: string;
}
  