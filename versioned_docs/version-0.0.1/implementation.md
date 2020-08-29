---
id: implementation
title: Server Implementation
---

If you have installed Heimdall, configure it as the [documentation](installation), and already 
prepared the [entities](entities) & [repositories](repositories) needed, now you can start to implement the
functionality of OAuth 2.0 authorization protocol in your CodeIgniter project.

:::note
In this documentation page, you'll learn how to implement the OAuth 2.0 with [Authorization Code](auth-code-grant)
grant type.
:::

---

## The Authorization Server

Authorization server is a [terminology](terminology) for an endpoint (server) which issues
access tokens after successfully authenticating a client and resource owner, and authorizing
the request.

To implement this endpoint, open your Heimdall implementation class
(```app/Libraries/OAuthServer/OAuthServer.php```) and implement as follows:

```php
<?php namespace App\Libraries\OAuthServer;

use Heimdall\Heimdall;
use Heimdall\Server\HeimdallAuthorizationServer;
use Heimdall\Server\HeimdallResourceServer;
use App\Libraries\OAuthServer\Repositories\AccessTokenRepository;
use App\Libraries\OAuthServer\Repositories\AuthCodeRepository;
use App\Libraries\OAuthServer\Repositories\ClientRepository;
use App\Libraries\OAuthServer\Repositories\IdentityRepository;
use App\Libraries\OAuthServer\Repositories\RefreshTokenRepository;
use App\Libraries\OAuthServer\Repositories\ScopeRepository;

abstract class OAuthServer
{

    // function to create a new instance of HeimdallAuthorizationServer
    static function createAuthorizationServer()
    {
        // creating HeimdallAuthorizationServer config
        $config = Heimdall::withAuthorizationConfig(
            new ClientRepository(),
            new AccessTokenRepository(),
            new ScopeRepository(),
            __DIR__ . '/private.key'
        );

        // creating HeimdallAuthorizationServer grant
        $grant = Heimdall::withAuthorizationCodeGrant(
            new AuthCodeRepository(),
            new RefreshTokenRepository()
        );

        // return a new instance of HeimdallAuthorizationServer
        return Heimdall::initializeAuthorizationServer($config, $grant);
    }
}
```

The function below will return a new ```HeimdallAuthorizationServer``` instance with [Authorization Code](auth-code-grant)
grant type.

### Applying to Authorization Controller

Create a new CodeIgniter's controller for authorization purposes. For instance, create new  ```Authorization```
controller class in the ```app/Controllers/Rest/``` directory.

This class is called [Authorization Controller](terminology).

```php
<?php namespace App\Controllers\Rest;

use Heimdall\Interfaces\AuthorizationController;
use App\Controllers\BaseController;
use App\Libraries\OAuthServer\Entities\UserEntity;
use App\Libraries\OAuthServer\OAuthServer;
use Exception;

class Authorization extends BaseController implements AuthorizationController
{

    private $heimdall;

    function __construct()
    {
        // get a new instance of HeimdallAuthorizationServer
        $this->heimdall = OAuthServer::createAuthorizationServer();

        // bootsrap heimdall with the codeigniter's request & response
        $this->heimdall->bootstrap($this->request, $this->response);
    }

    // authorization code generation endpoint
    function authorize()
    {
        try {
            $authRequest = $this->heimdall->validateAuth();
            $authRequest->setUser(new UserEntity());
            $this->heimdall->completeAuth($authRequest);
        } catch (Exception $exception) {
            $this->heimdall->handleException($exception);
        }
    }

    // access token generation endpoint
    function token()
    {
        try {
            $this->heimdall->createToken();
        } catch (Exception $exception) {
            $this->heimdall->handleException($exception);
        }
    }
}
```

### Set Up the Route

The last thing to do is to register the authorization endpoint in CodeIgniter's route (```app/Config/Routes.php```).

```php
$routes->get('rest/authorize', 'Rest/Authorization::authorize');
$routes->post('rest/token', 'Rest/Authorization::token');
```

---

## The Resource Server

Resource server is a [terminology](terminology) for an endpoint (server) which sits in front of protected
resources (for example “tweets”, users’ photos, or personal data) and is capable of accepting and responding
to protected resource requests using access tokens.

To implement this endpoint, open your Heimdall implementation class
(```app/Libraries/OAuthServer/OAuthServer.php```) and add a new function as below:

```php
// function to create a new instance of HeimdallResourceServer
static function createResourceServer()
{
    // creating HeimdallResourceServer config
    $config = Heimdall::withResourceConfig(
        new AccessTokenRepository(),
        __DIR__ . '/public.key'
    );

    // return a new instance of HeimdallResourceServer
    return Heimdall::initializeResourceServer($config);
}
```

The function below will return a new ```HeimdallResourceServer``` instance.

### Applying to Filter

In order to set up ```HeimdallResourceServer``` running with CodeIgniter, you need to apply it as a **middleware**.

<div align="center">
    <img src="https://miro.medium.com/max/679/1*4nJJgPOnlJwD6s-7ygqgTg.jpeg" alt="middleware" />
</div>

Middleware is a component that act as mediator between a request to your app and a response from your app. It serves
as a filtering purpose, for instance:

- User's session status detection
- CSRF (Cross-Site Request Forgery) protection
- Transforming the format of JSON response

Of course middleware can be used to do an OAuth 2.0 access token verification, and we'll implement this.

> In CodeIgniter 4, a **middleware** is called [Filter](https://codeigniter4.github.io/userguide/incoming/filters.html).

Create new ```ResourceFilter``` class in ```app/Filters``` directory, and implement it as below:

```php
<?php namespace App\Filters;

use App\Libraries\OAuthServer\OAuthServer;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Exception;

class ResourceFilter implements FilterInterface
{

    private $heimdall;

    function __construct()
    {
        // get a new HeimdallResourceServer instance
        $this->heimdall = HeimdallAuthorizationCode::createResourceServer();
    }

    // apply a access token verification on codeigniter's request action
    function before(RequestInterface $request, $arguments = null)
    {
        try {
            $this->heimdall->validate($request);
        } catch (Exception $exception) {
            $this->heimdall->handleException($exception);
        }
    }

    function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    { }
}
```

### Set Up the Filter

After you created the Filter, you have to apply it to ```app/Config/Filters.php``` in order to be installed
in your CodeIgniter project.

```php
// filters alias
public $aliases = [
    ...
    'resource' => ResourceFilter::class    // add a new filter alias
];

// filters configuration
public $filters = [
    'resource' => [
        'before' => [
            'rest/users',   // add the resource endpoint path that need to be validated
        ],
    ],
];
```

### Creating a Resource Controller

If the filter already installed & configured, now you can start creating a [Resource Controller](terminology).
For instance, create a new ```Users``` controller class in the ```app/Controllers/Rest``` directory.

```php
<?php namespace App\Controllers\Rest;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class Users extends BaseController
{
    use ResponseTrait;

    // return a users data
    function getUsers()
    {
        return $this->respond(['name' => 'Ezra Lazuardy']);
    }
}
```

### Set Up the Route

The last thing to do is to register the resource endpoint in CodeIgniter's route (```app/Config/Routes.php```).

```php
$routes->get('rest/users', 'Rest/Users::getUsers');
```

:::caution
Make sure the registered path in ```Route.php``` is already registered in the [filter](#set-up-the-filter) too.
:::