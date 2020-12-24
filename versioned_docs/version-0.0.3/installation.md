---
id: installation
title: Installation
---

In order to install Heimdall to your existing CodeIgniter 4 project, you have to use [Composer](https://getcomposer.org/).

In your root directory of your project, fire up a terminal and run:

```
composer require ezralazuardy/heimdall
```

Then Heimdall is ready to be configured and run in your server.

### Installing alpha version

In case you want to get the latest update in alpha version, you can install the ```dev-master``` version.

```
composer require ezralazuardy/heimdall:dev-master
```

:::caution
Please understand that ```dev-master``` version is **NOT** production ready, and some code may breaks.
Use it at your own risks.
:::

---

## Directory Structure

After successfully installed Heimdall, now you have to implement it as a [CodeIgniter library](https://codeigniter.com/user_guide/general/modules.html#libraries)
in ```app/Libraries``` directory of your CodeIgniter project. In your project root, create a directory
structure like below:

```
CodeIgniter 4 project root directory
├── app
│   └── Libraries
│       └── OAuthServer
│           └── Entities            # directory for your Entity classes
│           └── Repositories        # directory for your Repository classes
│           └── OAuthServer.php     # the implementation of Heimdall
├── ...
```

The **OAuthServer** library name used here is optional though, you can change it as you like. But the
main idea is to mark this CodeIgniter library as an implementation of Heimdall. In this documentation page,
let's assume that **OAuthServer** is the name of Heimdall implementation in your CodeIgniter project.

---

## Generating public & private key

The public / private key pair is used to sign and verify JWTs transmitted. The Authorization Server possesses
the private key to sign tokens, and the Resource Server possesses the corresponding public key to verify the
signatures.

Make sure you are inside the Heimdall implementation directory.

```
cd app/Libraries/OAuthServer
```

To generate the private key run this command on the terminal.

```
openssl genrsa -out private.key 2048
```

If you want to provide a passphrase for your private key run this command instead.

```
openssl genrsa -passout pass:_passphrase_ -out private.key 2048
```

Then, extract the public key from the private key.

```
openssl rsa -in private.key -pubout -out public.key
```

Or use your passphrase if provided on private key generation.

```
openssl rsa -in private.key -passin pass:_passphrase_ -pubout -out public.key
```

After you successfully generate the public & private key, your Heimdall implementation directory
would look like this:

```
CodeIgniter 4 project root directory
├── app
│   └── Libraries
│       └── OAuthServer
│           └── ...
│           └── private.key     # the private key
│           └── public.key      # the public key
├── ...
```

### Set public & private key file permission

This step is optional though, but according to the best security practice, it is recommended to set the public
& private key file permission properly.

Set your public & private key file permission via chmod in terminal.

```
sudo chmod 600 private.key
sudo chmod 600 public.key
```

Then verify the permission with:

```
ls –l private.key
ls -l public.key
```

The permission should display as "[-rw-------](https://chmodcommand.com/chmod-600/)".

---

## Generating encryption key

Encryption keys are used to encrypt authorization and refresh codes. Currently, Heimdall only support
a string password encryption key type.

### String password encryption key

A ```string password``` can vary in a strength depending on the password chosen. To turn it into a strong encryption
key the [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) key derivation function is used. This function derives
an encryption key from a password and is slow by design. It uses a lot of CPU resources for a fraction of a second,
applying key stretching to the password to reduce vulnerability to brute force attacks.

To generate a string password, you can run the following command in the terminal:

```
php -r 'echo base64_encode(random_bytes(32)), PHP_EOL;'
```

Then, copy the generated encryption key and apply it to your CodeIgniter ```.env``` file.

```
encryption.key = <put your generated encryption key here>
encryption.driver = OpenSSL
```

:::caution
You have to add the string password encryption key in your CodeIgniter ```.env``` file or Heimdall will throw a
```HeimdallConfigException``` at runtime due the lack of encryption key.
:::
