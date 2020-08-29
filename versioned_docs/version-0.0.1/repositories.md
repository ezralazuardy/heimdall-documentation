---
id: repositories
title: Preparing Repositories
---

Repository is a class that used by Heimdall to get the OAuth 2.0 functionality works. Depending on 
[which grant](grant-types) you are implementing you will need to implement a number of repository interfaces.

The repositories are expected to return (on success) instances of [entity interfaces](entities); to make integration
with your existing entities and models as easy as possible though, all required methods have been implemented
as traits that you can use.

:::note
Heimdall is based on [OAuth 2.0 Server](https://github.com/thephpleague/oauth2-server) library by
[thephpleague](https://github.com/thephpleague/oauth2-server), and all kind of the repository interfaces are still
the same. Check it out [here](https://github.com/thephpleague/oauth2-server/tree/master/src/Repositories).
:::

---

## Examples

For instance, in order to implement the [Authorization Code](auth-code-grant) grant type, you'll need a 5 kinds of
repositories.

In the ```Repositories``` directory inside your Heimdall implementation (eg. ```app/Libraries/OAuthServer/Repositories```),
add several class as follows:

#### AccessTokenRepository

```php
<?php namespace App\Libraries\OAuthServer\Repositories;

use App\Libraries\OAuthServer\Entities\AccessTokenEntity;
use League\OAuth2\Server\Entities\AccessTokenEntityInterface;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Repositories\AccessTokenRepositoryInterface;

class AccessTokenRepository implements AccessTokenRepositoryInterface
{

    public function persistNewAccessToken(AccessTokenEntityInterface $accessTokenEntity)
    {
        // Some logic here to save the access token to a database
    }

    public function revokeAccessToken($tokenId)
    {
        // Some logic here to revoke the access token
    }

    public function isAccessTokenRevoked($tokenId)
    {
        return false; // Access token hasn't been revoked
    }

    public function getNewToken(ClientEntityInterface $clientEntity, array $scopes, $userIdentifier = null)
    {
        $accessToken = new AccessTokenEntity();
        $accessToken->setClient($clientEntity);
        foreach ($scopes as $scope) $accessToken->addScope($scope);
        $accessToken->setUserIdentifier($userIdentifier);
        return $accessToken;
    }
}
```

#### AuthCodeRepository

```php
<?php namespace App\Libraries\OAuthServer\Repositories;

use App\Libraries\OAuthServer\Entities\AuthCodeEntity;
use League\OAuth2\Server\Entities\AuthCodeEntityInterface;
use League\OAuth2\Server\Repositories\AuthCodeRepositoryInterface;

class AuthCodeRepository implements AuthCodeRepositoryInterface
{

    public function persistNewAuthCode(AuthCodeEntityInterface $authCodeEntity)
    {
        // Some logic to persist the auth code to a database
    }

    public function revokeAuthCode($codeId)
    {
        // Some logic to revoke the auth code in a database
    }

    public function isAuthCodeRevoked($codeId)
    {
        return false; // The auth code has not been revoked
    }

    public function getNewAuthCode()
    {
        return new AuthCodeEntity();
    }
}
```

#### ClientRepository

```php
<?php namespace App\Libraries\OAuthServer\Repositories;

use App\Libraries\OAuthServer\Entities\ClientEntity;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Repositories\ClientRepositoryInterface;

class ClientRepository implements ClientRepositoryInterface
{

    // change this to your authorization url
    const REDIRECT_URI = 'https://oauth.pstmn.io/v1/callback';

    public function getClientEntity($clientIdentifier)
    {
        $client = new ClientEntity();
        $client->setIdentifier($clientIdentifier);
        $client->setName(getenv('app.name'));
        $client->setRedirectUri(ClientRepository::REDIRECT_URI);
        $client->setConfidential();
        return $client;
    }

    public function validateClient($clientIdentifier, $clientSecret, $grantType)
    {
        $clients = [
            'test' => [
                'secret'          => password_hash('test123', PASSWORD_BCRYPT),
                'name'            => getenv('app.name'),
                'redirect_uri'    => ClientRepository::REDIRECT_URI,
                'is_confidential' => true,
            ],
        ];

        if(array_key_exists($clientIdentifier, $clients) === false) {
            return false;
        }

        if (
            $clients[$clientIdentifier]['is_confidential'] === true
            && password_verify($clientSecret, $clients[$clientIdentifier]['secret']) === false
        ) {
            return false;
        }

        return true;
    }
}
```

#### RefreshTokenRepository

```php
<?php namespace App\Libraries\OAuthServer\Repositories;

use App\Libraries\OAuthServer\Entities\RefreshTokenEntity;
use League\OAuth2\Server\Entities\RefreshTokenEntityInterface;
use League\OAuth2\Server\Repositories\RefreshTokenRepositoryInterface;

class RefreshTokenRepository implements RefreshTokenRepositoryInterface
{

    public function persistNewRefreshToken(RefreshTokenEntityInterface $refreshTokenEntity)
    {
        // Some logic to persist the refresh token in a database
    }

    public function revokeRefreshToken($tokenId)
    {
        // Some logic to revoke the refresh token in a database
    }

    public function isRefreshTokenRevoked($tokenId)
    {
        return false; // The refresh token has not been revoked
    }

    public function getNewRefreshToken()
    {
        return new RefreshTokenEntity();
    }
}
```

#### ScopeRepository

```php
<?php namespace App\Libraries\OAuthServer\Repositories;

use App\Libraries\OAuthServer\Entities\ScopeEntity;
use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Entities\ScopeEntityInterface;
use League\OAuth2\Server\Repositories\ScopeRepositoryInterface;

class ScopeRepository implements ScopeRepositoryInterface
{

    public function getScopeEntityByIdentifier($scopeIdentifier)
    {
        $scopes = [
            'basic' => [
                'description' => 'Basic information'
            ],
            'email' => [
                'description' => 'Your email address',
            ],
        ];
        if (array_key_exists($scopeIdentifier, $scopes) === false) return null;
        $scope = new ScopeEntity();
        $scope->setIdentifier($scopeIdentifier);
        return $scope;
    }

    public function finalizeScopes(
        array $scopes,
        $grantType,
        ClientEntityInterface $clientEntity,
        $userIdentifier = null
    ) {
        if ((int) $userIdentifier === 1) {
            $scope = new ScopeEntity();
            $scope->setIdentifier('email');
            $scopes[] = $scope;
        }
        return $scopes;
    }
}
```

---

After applying those repositories, your Heimdall implementation directory structure would look like this:

```
CodeIgniter 4 project root directory
├── app
│   └── Libraries
│       └── OAuthServer
│           └── ...
│           └── Repositories
│           │   └── AccessTokenRepository.php
│           │   └── AuthCodeRepository.php
│           │   └── ClientRepository.php
│           │   └── RefreshTokenRepository.php
│           │   └── ScopeRepository.php
│           └── ...
├── ...
```
