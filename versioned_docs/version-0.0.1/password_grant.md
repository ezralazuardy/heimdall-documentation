---
id: password-grant
title: Password grant
---

> Reference: https://oauth.net/2/grant-types/password/

This grant is a great user experience for trusted first party clients both on the web and in native applications.

Password grant also usually called Resource Owner or Password Credentials grant.

---

## Flow

The client will ask the user for their authorization credentials (usually a username and password).

The client then sends a **POST** request with following body parameters to the authorization server:

- ```grant_type``` with the value ```password```
- ```client_id``` with the client’s ID
- ```client_secret``` with the client’s secret
- ```scope``` with a space-delimited list of requested scope permissions.
- ```username``` with the user’s username
- ```password``` with the user’s password

The authorization server will respond with a JSON object containing the following properties:

- ```token_type``` with the value ```Bearer```
- ```expires_in``` with an integer representing the TTL of the access token
- ```access_token``` a JWT signed with the authorization server’s private key
- ```refresh_token``` an encrypted payload that can be used to refresh the access token when it expires.

---

## Setup

To apply this grant type, use the [withPasswordGrant](grant-type-builder#withpasswordgrant) function builder.

```php
$config = Heimdall::withAuthorizationConfig(
    new ClientRepository(),         // ClientRepository instance
    new AccessTokenRepository(),    // AccessTokenRepository instance
    new ScopeRepository(),          // ScopeRepository instance
    __DIR__ . '/private.key'        // private.key string path
);

$grant = Heimdall::withPasswordGrant(
    new UserRepository(),           // UserRepository instance
    new RefreshTokenRepository()    // RefreshTokenRepository instance
);

return Heimdall::initializeAuthorizationServer($config, $grant);
```
