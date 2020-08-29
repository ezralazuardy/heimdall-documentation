---
id: terminology
title: Terminology
---

Some words that you need to know about Heimdall and the OAuth 2.0 authorization protocol.

```Access Token``` - A token used to access protected resources.

```Authorization Code``` - An intermediary token generated when a user authorizes a client to access protected
resources on their behalf. The client receives this token and exchanges it for an access token.

```Authorization Server``` - A server which issues access tokens after successfully authenticating a client and
resource owner, and authorizing the request.

```Authorization Controller``` - A CodeIgniter's [Controller](https://codeigniter4.github.io/userguide/incoming/controllers.html)
that implement an [AuthorizationController](https://github.com/ezralazuardy/heimdall/blob/master/src/Interfaces/AuthorizationController.php)
interface, used to implement the Authorization Server functionality.

```Client``` - An application which accesses protected resources on behalf of the
resource owner (such as a user). The client could be hosted on a server, desktop, mobile or other device.

```Grant``` - A grant is a method of acquiring an access token.

```Resource Server``` - A server which sits in front of protected resources (eg. user's data or personal data)
and is capable of accepting and responding to protected resource requests using access tokens.

```Resource Controller``` - A CodeIgniter's [Controller](https://codeigniter4.github.io/userguide/incoming/controllers.html)
that used for resource endpoint. This type of Controller will be protected by Resource Server.

```Resource Owner``` - The user who authorizes an application to access their account.
The application’s access to the user’s account is limited to the “scope” of the authorization
granted (e.g. read or write access).

```Scope``` - A permission.

```JWT``` - A JSON Web Token is a method for representing claims securely between two parties
as defined in [RFC 7519](https://tools.ietf.org/html/rfc7519).
