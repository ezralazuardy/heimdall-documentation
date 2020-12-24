---
id: authorization-server
title: Authorization Server
---

Authorization Server is an instance which issues access tokens after successfully authenticating a client
and resource owner, and authorizing the request (applied in CodeIgniter's [Controller](https://codeigniter4.github.io/userguide/incoming/controllers.html)).

This instance is also known as ```HeimdallAuthorizationServer```.

:::note
It's recommended for Controller that apply this instance to implement an [AuthorizationController](https://github.com/ezralazuardy/heimdall/blob/master/src/Interfaces/AuthorizationController.php)
interface.
:::

---

## bootstrap()

This method is used to set up the ```HeimdallAuthorizationServer``` with the current CodeIgniter request & response.
This method is strongly recommended to be called right after you get the ```HeimdallAuthorizationServer``` instance or
before you access other Heimdall's method (eg. [validateAuth](#validateauth)).

```php
class Authorization extends BaseController implements AuthorizationController
{

    private $heimdall;

    function __construct()
    {
        // get a new instance of HeimdallAuthorizationServer
        $this->heimdall = OAuthServer::createAuthorizationServer();

        // bootrap heimdall with the codeigniter's request & response
        $this->heimdall->bootstrap($this->request, $this->response);
    }
    
    ...
}
```

:::caution
If you have not bootstrap your ```HeimdallAuthorizationServer```, and you do access the other method inside of it
(eg. [validateAuth](#validateauth)), Heimdall will throw a ```HeimdallServerException```.
:::

---

## validateAuth()

> This method is only used for [Authorization Code](auth-code-grant) & [Implicit](implicit-grant) grant.

This method is used to verify the **authorization request** from the client.
If success, this method will return a ```AuthorizationRequest``` instance that will be used to generate an
**authorization code** in [completeAuth](#completeauth) method.

```php
function authorize()
{
    try {
        $authRequest = $this->heimdall->validateAuth();
        $authRequest->setUser(new UserEntity());
        ...
    } catch (Exception $exception) {
        $this->heimdall->handleException($exception);
    }
}
```

:::note
It is recommended to apply this method inside a ```try catch``` block since it can throw an ```Exception``` when
the request is **not valid**.
:::

---

## completeAuth()

> This method is only used for [Authorization Code](auth-code-grant) & [Implicit](implicit-grant) grant.

This method is used to generate **authorization code** based on ```AuthorizationRequest``` instance that created in
[validateAuth](#validateauth) method. If success, it will return an **authorization code** as JSON response to client.

```php
function authorize()
{
    try {
        ...
        $this->heimdall->completeAuth($authRequest);
    } catch (Exception $exception) {
        $this->heimdall->handleException($exception);
    }
}
```

:::note
It is recommended to apply this method inside a ```try catch``` block since it can throw an ```Exception``` when
the ```AuthorizationRequest``` instance provided is **not valid**.
:::

---

## createToken()

> If you apply an [Authorization Code](auth-code-grant) or [Implicit](implicit-grant) grant, the client **MUST** give a
> valid **authorization code** in the request body in order to exchange it with **access token**.

This method is used to generate **access token** based on the grant type. If success, it will return an
**access token** as JSON response to client.

```php
function token()
{
    try {
        $this->heimdall->createToken();
    } catch (Exception $exception) {
        $this->heimdall->handleException($exception);
    }
}
```

:::note
It is recommended to apply this method inside a ```try catch``` block since it can throw an ```Exception``` when
request or credential provided by the client is **not valid**.
:::

---

## handleException()

This method is used to handle an ```Exception``` thrown by Heimdall. It will automatically generate a
JSON output for the client based on the error message from ```Exception```, with the appropriate HTTP status code.

```php
try {
    ...
} catch (Exception $exception) {
    $this->heimdall->handleException($exception);
}
```
