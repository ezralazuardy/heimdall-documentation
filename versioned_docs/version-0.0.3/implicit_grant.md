---
id: implicit-grant
title: Implicit grant
---

> Reference: https://oauth.net/2/grant-types/implicit/

This grant is documented here for legacy purposes only. Industry best practice recommends using the Authorization Code
grant without a client secret for native and browser-based apps.

The implicit grant is similar to the authorization code grant with two distinct differences.

It is intended to be used for user-agent-based clients (e.g. single page web apps) that can’t keep a client secret
because all the application code and storage is easily accessible.

Secondly instead of the authorization server returning an authorization code which is exchanged for an access token,
the authorization server returns an access token.

:::caution
**It is no longer best practice to use the Implicit Grant.**
:::

---

## Flow

The client will redirect the user to the authorization server with the following parameters in the query string:

- ```response_type``` with the value ```token```
- ```client_id``` with the client identifier
- ```redirect_uri``` with the client redirect URI. This parameter is optional, but if not sent the user will be
redirected to a pre-registered redirect URI.
- ```scope``` a space delimited list of scopes
- ```state``` with a [CSRF token](https://portswigger.net/web-security/csrf/tokens). This parameter is optional but
highly recommended. You should store the value of the CSRF token in the user’s session to be validated when they return.

All of these parameters will be validated by the authorization server.

The user will then be asked to login to the authorization server and approve the client.

If the user approves the client they will be redirected back to the authorization server with the following
parameters in the query string:

- ```token_type``` with the value ```Bearer```
- ```expires_in``` with an integer representing the TTL of the access token
- ```access_token``` a JWT signed with the authorization server’s private key
- ```state``` with the state parameter sent in the original request. You should compare this value with the value
stored in the user’s session to ensure the authorization code obtained is in response to requests made by this
client rather than another client application.

:::note
This grant does **NOT** return a refresh token.
:::

---

## Setup

To apply this grant type, use the [withImplicitGrant](grant-type-builder#withimplicitgrant)
function builder.

```php
$config = Heimdall::withAuthorizationConfig(
    new ClientRepository(),         // ClientRepository instance
    new AccessTokenRepository(),    // AccessTokenRepository instance
    new ScopeRepository(),          // ScopeRepository instance
    __DIR__ . '/private.key'        // private.key string path
);

$grant = Heimdall::withImplicitGrant();

return Heimdall::initializeAuthorizationServer($config, $grant);
```
