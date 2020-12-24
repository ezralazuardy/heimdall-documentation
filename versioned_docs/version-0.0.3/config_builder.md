---
id: config-builder
title: Configuration Builder
---

Heimdall Configuration function builder is used to build a set of configuration that needed
by the Authorization or Resource Server.

---

## withAuthorizationConfig()

This method is used to build a ```HeimdallAuthorizationConfig``` instance for ```HeimdallAuthorizationServer```.

```php
Heimdall::withAuthorizationConfig(
    new ClientRepository(),         // ClientRepository instance
    new AccessTokenRepository(),    // AccessTokenRepository instance
    new ScopeRepository(),          // ScopeRepository instance
    __DIR__ . '/private.key'        // private.key file path
);
```

:::note
This method take 4 parameters, a ```ClientRepository``` instance, an ```AccessTokenRepository``` instance,
a ```ScopeRepository``` instance, and a string of your ```private.key``` file path.
:::

### Using private.key password

If you generated ```private.key``` with a password, you **NEED** to add your password as an array like below:

```php
Heimdall::withAuthorizationConfig(
    ...
    [
        'path'     => __DIR__ . '/private.key',
        'password' => 'your private.key password'
    ]
);
```

:::caution
If you generated ```private.key``` with a password, but you have not provides the password in an array,
or the provided password is wrong then Heimdall will throw a ```HeimdallConfigException```.
:::

### Strict private.key permission check

Optionally, you can add the ```permissionCheck``` index to the array and set the value as ```true``` to verify
the permission of your ```private.key```. The default value is ```false```.

```php
Heimdall::withAuthorizationConfig(
    ...
    [
        ...
        'permissionCheck' => true   // optional, to verify the permission of private.key
    ]
);
```

:::caution
If you've set the ```permissionCheck``` as ```true```, but your private.key permission is [not correct](installation#set-public--private-key-file-permission),
then Heimdall will throw a ```HeimdallConfigException```.
:::

---

## withResourceConfig()

This method is used to build a ```HeimdallResourceConfig``` instance for ```HeimdallResourceServer```.

```php
Heimdall::withResourceConfig(
    new AccessTokenRepository()     // AccessTokenRepository instance,
    __DIR__ . '/public.key'         // public.key file path
);
```

:::note
This method take 2 parameters, an ```AccessTokenRepository``` instance, and a string of your
```public.key``` file path.
:::

### Using public.key password

If you generated ```public.key``` with a password, you **NEED** to add your password as an array like below:

```php
Heimdall::withResourceConfig(
    ...
    [
        'path'     => __DIR__ . '/public.key',
        'password' => 'your public.key password'
    ]
);
```

:::caution
If you generated ```public.key``` with a password, but you have not provides the password in an array,
or the provided password is wrong, then Heimdall will throw a ```HeimdallConfigException```.
:::

### Strict public.key permission check

Optionally, you can add the ```permissionCheck``` index to the array and set the value as ```true``` to verify
the permission of your ```public.key```. The default value is ```false```.

```php
Heimdall::withResourceConfig(
    ...
    [
        ...
        'permissionCheck' => true   // optional, to verify the permission of public.key
    ]
);
```

:::caution
If you've set the ```permissionCheck``` as ```true```, but your ```public.key``` permission is [not correct](installation#set-public--private-key-file-permission),
then Heimdall will throw a ```HeimdallConfigException```.
:::
