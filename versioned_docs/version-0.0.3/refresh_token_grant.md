---
id: refresh-token-grant
title: Refresh Token grant
---

> Reference: https://oauth.net/2/grant-types/refresh-token/

Access tokens eventually expire; however some grants respond with a refresh token which enables the client to refresh
the access token.

---

## Flow

The client sends a **POST** request with following body parameters to the authorization server:

- ```grant_type``` with the value ```refresh_token```
- ```refresh_token``` with the refresh token
- ```client_id``` with the client’s ID
- ```client_secret``` with the client’s secret
- ```scope``` with a space-delimited list of requested scope permissions. This is optional; if not sent the original
scopes will be used, otherwise you can request a reduced set of scopes.

The authorization server will respond with a JSON object containing the following properties:

- ```token_type``` with the value ```Bearer```
- ```expires_in``` with an integer representing the TTL of the access token
- ```access_token``` a new JWT signed with the authorization server’s private key
- ```refresh_token``` an encrypted payload that can be used to refresh the access token when it expires

---

## Setup

To apply this grant type, use the [withRefreshTokenGrant](grant-type-builder#withrefreshtokengrant)
function builder.

```php
$config = Heimdall::withAuthorizationConfig(
    new ClientRepository(),         // ClientRepository instance
    new AccessTokenRepository(),    // AccessTokenRepository instance
    new ScopeRepository(),          // ScopeRepository instance
    __DIR__ . '/private.key'        // private.key string path
);

$grant = Heimdall::withRefreshTokenGrant(
    new RefreshTokenRepository()    // RefreshTokenRepository instance
);

return Heimdall::initializeAuthorizationServer($config, $grant);
```
