---
id: entities
title: Preparing Entities
---

Entity is a class that will be used in [repository](repositories) to hold some state & data.
This class is required to get the repository working properly. Depending on [which grant](grant-types)
you are implementing you will need to implement a number of entity interfaces.

:::note
Heimdall is based on [OAuth 2.0 Server](https://github.com/thephpleague/oauth2-server) library by
[thephpleague](https://github.com/thephpleague/oauth2-server), and all kind of the entity interfaces used are still
the same. Check it out [here](https://github.com/thephpleague/oauth2-server/tree/master/src/Entities).
:::

---

## Examples

For instance, in order to implement the [Authorization Code](auth-code-grant) grant type, you'll need a 6 kinds of entity.

In the ```Entities``` directory inside your Heimdall implementation (eg. ```app/Libraries/OAuthServer/Entities```),
add several class as follows:

##### AccessTokenEntity

```php
<?php namespace App\Libraries\OAuthServer\Entities;

use League\OAuth2\Server\Entities\AccessTokenEntityInterface;
use League\OAuth2\Server\Entities\Traits\AccessTokenTrait;
use League\OAuth2\Server\Entities\Traits\EntityTrait;
use League\OAuth2\Server\Entities\Traits\TokenEntityTrait;

class AccessTokenEntity implements AccessTokenEntityInterface
{
    use AccessTokenTrait, TokenEntityTrait, EntityTrait;
}
```

#### AuthCodeEntity

```php
<?php namespace App\Libraries\OAuthServer\Entities;

use League\OAuth2\Server\Entities\AuthCodeEntityInterface;
use League\OAuth2\Server\Entities\Traits\AuthCodeTrait;
use League\OAuth2\Server\Entities\Traits\EntityTrait;
use League\OAuth2\Server\Entities\Traits\TokenEntityTrait;

class AuthCodeEntity implements AuthCodeEntityInterface
{
    use EntityTrait, TokenEntityTrait, AuthCodeTrait;
}
```

#### ClientEntity

```php
<?php namespace App\Libraries\OAuthServer\Entities;

use League\OAuth2\Server\Entities\ClientEntityInterface;
use League\OAuth2\Server\Entities\Traits\ClientTrait;
use League\OAuth2\Server\Entities\Traits\EntityTrait;

class ClientEntity implements ClientEntityInterface
{
    use EntityTrait, ClientTrait;

    public function setName($name)
    {
        $this->name = $name;
    }

    public function setRedirectUri($uri)
    {
        $this->redirectUri = $uri;
    }

    public function setConfidential($confidential = true)
    {
        $this->isConfidential = $confidential;
    }
}
```

#### RefreshTokenEntity

```php
<?php namespace App\Libraries\OAuthServer\Entities;

use League\OAuth2\Server\Entities\RefreshTokenEntityInterface;
use League\OAuth2\Server\Entities\Traits\EntityTrait;
use League\OAuth2\Server\Entities\Traits\RefreshTokenTrait;

class RefreshTokenEntity implements RefreshTokenEntityInterface
{
    use RefreshTokenTrait, EntityTrait;
}
```

#### ScopeEntity

```php
<?php namespace App\Libraries\OAuthServer\Entities;

use League\OAuth2\Server\Entities\ScopeEntityInterface;
use League\OAuth2\Server\Entities\Traits\EntityTrait;
use League\OAuth2\Server\Entities\Traits\ScopeTrait;

class ScopeEntity implements ScopeEntityInterface
{
    use EntityTrait, ScopeTrait;
}
```

#### UserEntity

```php
<?php namespace App\Libraries\OAuthServer\Entities;

use League\OAuth2\Server\Entities\Traits\EntityTrait;
use League\OAuth2\Server\Entities\UserEntityInterface;

class UserEntity implements UserEntityInterface
{
    use EntityTrait;

    public function __construct($identifier = 1)
    {
        $this->setIdentifier($identifier);
    }

    public function getIdentifier()
    {
        return $this->identifier;
    }
}
```

---

After applying those entities, your Heimdall implementation directory structure would look like this:

```
CodeIgniter 4 project root directory
├── app
│   └── Libraries
│       └── OAuthServer
│           └── Entities
│           │   └── AccessTokenEntity.php
│           │   └── AuthCodeEntity.php
│           │   └── ClientEntity.php
│           │   └── RefreshTokenEntity.php
│           │   └── ScopeEntity.php
│           │   └── UserEntity.php
│           └── ...
├── ...
```