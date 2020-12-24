---
id: server-builder
title: Server Builder
---

Heimdall Server function builder is used to build an instance of Authorization or Resource Server.

---

## initializeAuthorizationServer()

This method is used to build a ```HeimdallAuthorizationServer``` instance.

```php
Heimdall::initializeAuthorizationServer(
    $config,    // HeimdallAuthorizationConfig instance
    $grant      // HeimdallAuthorizationGrant instance
);
```

This method take 2 parameters by default, a [HeimdallAuthorizationConfig](config-builder) and
[HeimdallAuthorizationGrant](grant-type-builder) instance.

---

## initializeResourceServer()

This method is used to build a ```HeimdallResourceServer``` instance.

```php
Heimdall::initializeResourceServer(
    $config     // HeimdallResourceConfig instance
);
```

This method take a [HeimdallResourceConfig](config-builder) instance as parameter.