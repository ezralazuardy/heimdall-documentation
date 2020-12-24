---
id: oidc
title: OpenID Connect
---

> References: https://openid.net/connect/

OpenID Connect is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the
identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain
basic profile information about the End-User in an interoperable and REST-like manner.

OpenID Connect allows clients of all types, including Web-based, mobile, and JavaScript clients, to request
and receive information about authenticated sessions and end-users. The specification suite is extensible,
allowing participants to use optional features such as encryption of identity data, discovery of OpenID Providers,
and session management, when it makes sense for them.

Fortunately, Heimdall support this feature.

---

## Default Scope

Heimdall already provide the standard OAuth 2.0 scope for
OpenID Connect as stated [here](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).

### ```profile```
(OPTIONAL) This scope value requests access to the End-User's default profile Claims, which are: name, family_name,
given_name, middle_name, nickname, preferred_username, profile, picture, website, gender, birthdate, zoneinfo, locale,
and updated_at.

### ```email```
(OPTIONAL) This scope value requests access to the email and email_verified Claims.

### ```address```
(OPTIONAL) This scope value requests access to the address Claim.

### ```phone```
(OPTIONAL) This scope value requests access to the phone_number and phone_number_verified Claims.

:::note
If you want to use any of these standard OIDC scope, please register it manually in ```getScopeEntityByIdentifier()```
method inside your ```ScopeRepository```.
:::

---

## Enabling OIDC

In order to enable OIDC in ```HeimdallAuthorizationServer```, you need to pass an instance of ```HeimdallOIDC```
in addition to ```HeimdallAuthorizationConfig``` and ```HeimdallAuthorizationGrantType```.

For example, you can follow these 4 steps below.

### Prepare The Repository

```HeimdallOIDC``` needs a repository class called ```IdentityRepository``` that implements [IdentityRepositoryInterface](https://github.com/ezralazuardy/heimdall/blob/master/src/Interfaces/IdentityRepositoryInterface.php).

```php
class IdentityRepository implements IdentityRepositoryInterface
{

    public function getUserEntityByIdentifier($identifier)
    {
        return new UserEntity($identifier);
    }
}
```

### Implement The ClaimSetInterface

Edit your ```UserEntity``` to implements a ```ClaimSetInterface```. You also need to override the ```getClaim()```
method to return an array of user's claim (data).

```php
class UserEntity implements UserEntityInterface, ClaimSetInterface
{

    ...
    
    public function getClaims(): array
    {
        return [
            // profile
            'name' => 'John Smith',
            'family_name' => 'Smith',
            'given_name' => 'John',
            'middle_name' => 'Doe',
            'nickname' => 'JDog',
            'preferred_username' => 'jdogsmith77',
            'profile' => '',
            'picture' => 'avatar.png',
            'website' => 'http://www.google.com',
            'gender' => 'M',
            'birthdate' => '01/01/1990',
            'zoneinfo' => '',
            'locale' => 'US',
            'updated_at' => '01/01/2018',
            // email
            'email' => 'john.doe@example.com',
            'email_verified' => true,
            // phone
            'phone_number' => '(866) 555-5555',
            'phone_number_verified' => true,
            // address
            'address' => '50 any street, any state, 55555',
        ];
    }
}
```

### Registering The Scope

Register the scope that you want to use in the ```getScopeEntityByIdentifier()``` method inside ```ScopeRepository```,
so that ```HeimdallAuthorizationServer``` can recognize these scope.

```php
class ScopeRepository implements ScopeRepositoryInterface
{

    public function getScopeEntityByIdentifier($scopeIdentifier)
    {
        $scopes = [
            // required for OIDC
            'openid' => [
                'description' => 'Enable OpenID Connect support'
            ],
            // register OIDC profile scope
            'profile' => [
                'description' => 'User profile data'
            ],
            // register OIDC email scope
            'email' => [
                'description' => 'User email address'
            ],
        ];

        ...

    }

    ...

}
```

### Apply to Authorization Server

The last thing to do is to pass the ```HeimdallOIDC``` instance to [initializeAuthorizationServer()](server-builder#initializeauthorizationserver)
method.

```php
static function createAuthorizationServer()
{
    // get HeimdallAuthorizationConfig instance
    $config = Heimdall::withAuthorizationConfig( ... );

    // get HeimdallAuthorizationGrantType instance
    $grantType = Heimdall::withAuthorizationCodeGrantType( ... );

    // get the HeimdallOIDC instance
    $oidc = Heimdall::withOIDC(
        new IdentityRepository()    // IdentityRepository instance
    );

    // pass it to HeimdallAuthorizationServer
    return Heimdall::initializeAuthorizationServer($config, $grantType, $oidc);
}
```

Optionally, you can pass an array of ```ClaimSetEntity``` to add a new scope (in addition to the
[default scope](#default-scope)) in the second parameter of ```withOIDC()``` method.

```php
use OpenIDConnectServer\Entities\ClaimSetEntity;

static function createAuthorizationServer()
{
    ...

    $oidc = Heimdall::withOIDC(new IdentityRepository(), [
        new ClaimSetEntity('test', [
            // define the required user's claim for the new scope
            'name',
            'address',
            'birthdate'
        ])
    ]);

    ...
}
```

:::caution
Please make sure that the new scope you add to ```HeimdallOIDC``` is already registered in
```getScopeEntityByIdentifier()``` method inside your ```ScopeRepository```. If the client use any of the unregistered
scope, Heimdall will throw ```HeimdallServerException``` due to unknown scope detected.
:::

---

## Testing

The only way to check whether your OIDC is working or not is to tell the client to use the ```openid``` and the
other registered OIDC scopes. If the client successfully issued a new access token in Authorization Server that 
support OIDC, there will be an ```id_token``` parameter inside the generated JSON like below:

```json
{
    "id_token": " ... ",
    "token_type": "Bearer",
    "expires_in": 3600,
    "access_token": " ... ",
    "refresh_token": " ... "
}
```

Similar to ```access_token```, an ```id_token``` is a JWTs value that have **Header**, **Payload**, and **Signature**.
It would look like this:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ0ZXN0IiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNTk4MjgwNzQ5LCJleHAiOjE1OTgyODQzNDgsInN1YiI6IjEiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.bmtRsJ46jaxc8IxKcjQNOhEjV1TlKUeoY2zxNP9kj5NdMmOl_Tj3J8pcCG9nAv5khBKT49zQfdLdTplwzico8VhvOMfo2vxWuLUEf4Ga31mmizPod8ZdTtmJCcBBAG_B48V2Rp57k-vHSTYkAfkMdidvTqlwRTBwsnCLQ5Obyq1h_zAzldAm4t0_Vr1c1GLipC68YO2p9i2iky5-P-POvU1J-ldH8fQd-FBT_Nj6KT-3WeP1-u4HNpFz23kZ3Kr-g_urbcc5AH9PETMgnBR_wtP0mGHhSrkZ3bPHysf6NaQcaAnzM9xjq6jotr9oamuo7pzeF5j2O1wbX3oymW3uzA
```

As an abstract explanation, ```id_token``` is a token issued as a result of user authentication. It's not so
valuable than the ```access_token``` because it's purpose is only to remove the need for an extra round trip to
get user information.

The decoded payload from ```id_token``` would look like this:

```json
{
  "aud": "test",
  "iss": "https://localhost:8080",
  "iat": 1598280749,
  "exp": 1598284348,
  "sub": "1",
  "email": "john.doe@example.com",
  "email_verified": true
}
```

> References: https://medium.com/@darutk/understanding-id-token-5f83f50fa02e
