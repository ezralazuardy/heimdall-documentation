---
id: client-credentials-grant
title: Client Credentials grant
---

> Reference: https://oauth.net/2/grant-types/client-credentials/

This grant is suitable for machine-to-machine authentication, for example for use in a cron job which is performing
maintenance tasks over an API. Another example would be a client making requests to an API that don’t require user’s
permission.

---

## Flow

The client sends a **POST** request with following body parameters to the authorization server:

- ```grant_type``` with the value ```client_credentials```
- ```client_id``` with the client’s ID
- ```client_secret``` with the client’s secret
- ```scope``` with a space-delimited list of requested scope permissions.

The authorization server will respond with a JSON object containing the following properties:

- ```token_type``` with the value ```Bearer```
- ```expires_in``` with an integer representing the TTL of the access token
- ```access_token``` a JWT signed with the authorization server’s private key

---

## Setup

To apply this grant type, use the [withClientCredentialsGrant](grant-type-builder#withclientcredentialsgrant)
function builder.

```php
$config = Heimdall::withAuthorizationConfig(
    new ClientRepository(),         // ClientRepository instance
    new AccessTokenRepository(),    // AccessTokenRepository instance
    new ScopeRepository(),          // ScopeRepository instance
    __DIR__ . '/private.key'        // private.key string path
);

$grant = Heimdall::withClientCredentialsGrant();

return Heimdall::initializeAuthorizationServer($config, $grant);
```
