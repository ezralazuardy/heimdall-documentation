---
id: requirements
title: Requirements
---

In order to prevent [man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack),
the authorization server **MUST** require the use of TLS with server authentication as defined by
[RFC2818](https://tools.ietf.org/html/rfc2818) for any request sent to the authorization and token endpoints.
The client **MUST** validate the authorization server’s TLS certificate as defined by
[RFC6125](https://tools.ietf.org/html/rfc6125) and in accordance with its requirements for server
identity authentication.

In simple words, you have to use the HTTPS protocol (HTTP over TLS) for your authorization server, and
the client have to implement a some way to validate the validity of your authorization server's TLS certificate.

Since this library was designed for ```CodeIgniter 4```, so you have to use the minimum ```PHP version 7.2```.

The ```openssl``` and ```json``` extensions are also required.
