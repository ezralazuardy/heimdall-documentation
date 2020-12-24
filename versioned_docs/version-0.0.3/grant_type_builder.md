---
id: grant-type-builder
title: Grant Type Builder
---

Heimdall Grant Type function builder is used to build a grant type that needed
by the Authorization Server.

These instance is also known as a ```HeimdallAuthorizationGrant```.

---

## withClientCredentialsGrant()

This method is used to apply a [Client Credentials](client-credentials-grant) grant to ```HeimdallAuthorizationServer```.

```php
Heimdall::withClientCredentialsGrant(
    'PT1H'  // string of Access Token TTL (optional)
);
```

This method takes **no parameter** by default, but optionally, you can add a string of ```Access Token TTL``` in
[PHP DateInterval string format](https://www.webfx.com/blog/web-design/php-dateinterval-class/) to set
the lifetime of successfully generated access token.

:::note
- Default value for ```Access Token TTL``` is ```PT1H``` that means it will last for **1 hour**.
:::

---

## withPasswordGrant()

This method is used to apply a [Password](password-grant) grant to ```HeimdallAuthorizationServer```.

```php
Heimdall::withPasswordGrant(
    new UserRepository(),           // UserRepository instance,
    new RefreshTokenRepository(),   // RefreshTokenRepository instance,
    'P1M',                          // string of Refresh Token TTL (optional),
    'PT1H'                          // string of Access Token TTL (optional)
);
```

This method take 2 parameters by default, a ```UserRepository``` and ```RefreshTokenRepository``` instance.

Optionally, you can add 2 more parameters, a string of ```Refresh Token TTL``` and ```Access Token TTL```
in [PHP DateInterval string format](https://www.webfx.com/blog/web-design/php-dateinterval-class/) to respectively
set the lifetime of successfully generated refresh token and access token.

:::note
- Default value for ```Refresh Token TTL``` is ```P1M``` that means the refresh token will last for **1 month**.
- Default value for ```Access Token TTL``` is ```PT1H``` that means the access token will last for **1 hour**. 
:::

---

## withAuthorizationCodeGrant()

This method is used to apply an [Authorization Code](auth-code-grant) grant to ```HeimdallAuthorizationServer```.

```php
Heimdall::withAuthorizationCodeGrant(
    new AuthCodeRepository(),       // AuthCodeRepository instance,
    new RefreshTokenRepository()    // RefreshTokenRepository instance,
    'PT10M'                         // string of Authorization Code TTL (optional),
    'P1M'                           // string of Refresh Token TTL (optional),
    'PT1H'                          // string of Access Token TTL (optional)
);
```

This method take 2 parameters by default, a ```AuthCodeRepository``` and ```RefreshTokenRepository``` instance.

Optionally, you can add 3 more parameters, a string of ```Authorization Code TTL```, ```Refresh Token TLL```,
and ```Access Token TTL``` in [PHP DateInterval string format](https://www.webfx.com/blog/web-design/php-dateinterval-class/)
to respectively set the lifetime of successfully generated authorization code, refresh token, and access token.

:::note
- Default value for ```Authorization Code TTL``` is ```PT10M``` that means it will last for **10 minute**.
- Default value for ```Refresh Token TTL``` is ```P1M``` that means it will last for **1 month**.
- Default value for ```Access Token TTL``` is ```PT1H``` that means it will last for **1 hour**.
:::

---

## withImplicitGrant()

This method is used to apply an [Implicit](implicit-grant) grant to ```HeimdallAuthorizationServer```.

```php
Heimdall::withImplicitGrant(
    'PT1H'  // string of Access Token TTL (optional)
);
```

This method takes **no parameter** by default, but optionally, you can add a string of ```Access Token TTL``` in
[PHP DateInterval string format](https://www.webfx.com/blog/web-design/php-dateinterval-class/) to set
the lifetime of successfully generated access token.

:::note
- Default value for ```Access Token TTL``` is ```PT1H``` that means it will last for **1 hour**.
:::

---

## withRefreshTokenGrant()

This method is used to apply a [Refresh Token](refresh-token-grant) grant to ```HeimdallAuthorizationServer```.

```php
Heimdall::withRefreshTokenGrant(
    new RefreshTokenRepository()    // RefreshTokenRepository instance,
    'P1M'                           // string of Refresh Token TTL (optional),
    'PT1H'                          // string of Access Token TTL (optional)
);
```

This method take a ```RefreshTokenRepository``` instance as parameter by default.

Optionally, you can add 2 more parameters, a string of ```Refresh Token TTL``` and ```Access Token TTL```
in [PHP DateInterval string format](https://www.webfx.com/blog/web-design/php-dateinterval-class/) to respectively
set the lifetime of successfully generated refresh token and access token.

:::note
- Default value for ```Refresh Token TTL``` is ```P1M``` that means it will last for **1 month**.
- Default value for ```Access Token TTL``` is ```PT1H``` that means it will last for **1 hour**.
:::
