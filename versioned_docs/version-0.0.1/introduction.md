---
id: introduction
slug: /
title: Introduction
---

Inspired from the Norse mythology, [Heimdallr](https://en.wikipedia.org/wiki/Heimdallr),
modernly anglicized as Heimdall is the gatekeeper of Bifröst, the rainbow road
connecting Midgard, realm of the humans, to Asgard, the realm of Gods.

In CodeIgniter 4, Heimdall serves as the gatekeeper between the client and the Resource server.
Heimdall gives you an out of the box OAuth 2.0 authorization protocol implementation
to your Web Service. Heimdall also comes with some handy extensions such as [Open ID Connect](https://openid.net/connect/)
support to gives you a simple identity layer on top of the OAuth 2.0 protocol and a
[Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636) support.

Heimdall implements the standards compliant implementation of an [OAuth 2.0](https://tools.ietf.org/html/rfc6749)
authorization server written in PHP which makes working with OAuth 2.0 trivial. You can easily configure an
OAuth 2.0 server to protect your API with access tokens, or allow clients to request new access tokens and
refresh them.

This library was created in order to simplify the need of OAuth 2.0 implementation
in your CodeIgniter 4 framework, based on the [OAuth 2.0 Server](https://github.com/thephpleague/oauth2-server)
library by [thephpleague](https://thephpleague.com).

---

## Why Heimdall?

Some reason you need to consider to use Heimdall instead of the original [OAuth 2.0 Server](https://github.com/thephpleague/oauth2-server)
for your CodeIgniter 4 project.

### Simple & Concise API

Heimdall gives you a simple, clear, and concise API to get the OAuth 2.0 work as fast as possible.

### Useful Extensions

Heimdall also gives you some extensions to work with OAuth 2.0 flow. Check it out [here](oidc).

### Fix the lack of PSR-7 classes

The [OAuth 2.0 Server](https://github.com/thephpleague/oauth2-server) library is relied on HTTP message classes
that [PSR-7 compliant](https://www.php-fig.org/psr/psr-7/). This is a normal standard by [PHP FIG](https://www.php-fig.org/)
to ensures interoperability between other packages and frameworks.

CodeIgniter 4 framework also compatible with a number of PHP FIG's proposals, but the
```PSR-7: HTTP Message Interface``` is different from the standard recommendation.
As stated [here](https://codeigniter.com/user_guide/intro/psr.html), it says that:

> CodeIgniter does not strive for compatibility with PSR-7 recommendation.

This means you need to re-implement the PSR-7 classes if you need it to work with the standard recommendation.
Heimdall already fix this problem, what you need to do is only to [install](installation) &
[implement](implementation) it properly, and the OAuth 2.0 flow will work as you expected.

---

## RFC Implementation

The following RFC's are implemented in this library:

- [RFC6749 “OAuth 2.0”](https://tools.ietf.org/html/rfc6749)
- [RFC6750 “The OAuth 2.0 Authorization Framework: Bearer Token Usage”](https://tools.ietf.org/html/rfc6750)
- [RFC7519 “JSON Web Token (JWT)”](https://tools.ietf.org/html/rfc7519)
- [RFC7636 “Proof Key for Code Exchange by OAuth Public Clients”](https://tools.ietf.org/html/rfc7636)

---

## Latest Version

See the latest released Heimdall version [here](https://github.com/ezralazuardy/heimdall/releases).

<a href="https://github.com/ezralazuardy/heimdall/releases"><img src="https://img.shields.io/github/v/release/ezralazuardy/heimdall" alt="release" target="_blank" rel="noopener noreferrer" /></a>

---

## Support

Please ask questions on the [Heimdall GitHub issues](https://github.com/ezralazuardy/heimdall/issues) page.

Heimdall was crafted by Ezra Lazuardy and originally created by Alex Bilbie.
Find them on Twitter at [@ezralazuardyy](https://twitter.com/ezralazuardyy) and
[@alexbilbie](https://twitter.com/alexbilbie).
