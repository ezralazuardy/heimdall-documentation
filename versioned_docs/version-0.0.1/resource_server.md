---
id: resource-server
title: Resource Server
---

Resource Server is an instance that capable of accepting and responding to protected resource requests
using access tokens (applied in CodeIgniter's [Filter](https://codeigniter4.github.io/userguide/incoming/filters.html)).

This instance is also known as ```HeimdallResourceServer```.

---

## validate()

This method is used to verify the client's access token on each client's request. If success, this method return
nothing (void), and the client's request would be continued to the [Resource Controller](terminology).

```php
function before(RequestInterface $request, $arguments = null)
{
    try {
        $this->heimdall->validate($request);
    } catch (Exception $exception) {
        $this->heimdall->handleException($exception);
    }
}
```

:::note
It is recommended to apply this method inside a ```try catch``` block since it can throw an ```Exception``` when
the access token provided is **not valid**.
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
