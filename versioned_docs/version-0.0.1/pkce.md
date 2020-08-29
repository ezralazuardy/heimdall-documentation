---
id: pkce
title: PKCE
---

> References: https://oauth.net/2/pkce/

Proof Key for Code Exchange ([RFC 7636](https://tools.ietf.org/html/rfc7636)) is an extension to the
[Authorization Code](auth-code-grant) flow to prevent several attacks and to be able to securely perform the OAuth
exchange from public clients.

It was originally designed to protect mobile apps, but its ability to prevent authorization code injection makes it
useful for every OAuth client, even web apps that use a client secret.

Heimdall has an out of the box feature to support this.

---

## Enabling PKCE

To enable PKCE, all you need to do is to tell your client to add a ```code_challenge``` in request body when
requesting an ```authorization_code```. ```HeimdallAuthorizationServer``` will automatically initiate PKCE checks
whenever a client sends a ```code_challenge```.

After that, when the client want to issue an ```access_token```, client must also send the ```code_verifier```,
so that the server can verify it's a legit request from the right client.

### Creating ```code_verifier```

This parameter is used to verify the request is from the right client when issuing an ```access_token```.
This parameter value is basically a random 32-bit string or a [CSRF token](https://portswigger.net/web-security/csrf/tokens)
from user's session.

#### Javascript sample

```javascript
// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
var verifier = base64URLEncode(crypto.randomBytes(32));
```

#### Java sample

```java
// Dependency: Apache Commons Codec
// https://commons.apache.org/proper/commons-codec/
// Import the Base64 class.
// import org.apache.commons.codec.binary.Base64;
SecureRandom sr = new SecureRandom();
byte[] code = new byte[32];
sr.nextBytes(code);
String verifier = Base64.encodeToString(code, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);
```

#### Swift 3 sample

```swift
var buffer = [UInt8](repeating: 0, count: 32)
_ = SecRandomCopyBytes(kSecRandomDefault, buffer.count, &buffer)
let verifier = Data(bytes: buffer).base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "\_")
    .replacingOccurrences(of: "=", with: "")
    .trimmingCharacters(in: .whitespaces)
```

### Creating ```code_challenge```

This parameter is used to initiate PKCE in the server. The client should send this when requesting an
```authorization_code```. This parameter value is a ```code_verifier``` value that encrypted using
[SHA-256](https://en.wikipedia.org/wiki/SHA-2).

#### Javascript sample
```javascript
// Dependency: Node.js crypto module
// https://nodejs.org/api/crypto.html#crypto_crypto
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
var challenge = base64URLEncode(sha256(verifier));
```

#### Java sample

```java
// Dependency: Apache Commons Codec
// https://commons.apache.org/proper/commons-codec/
// Import the Base64 class.
// import org.apache.commons.codec.binary.Base64;
byte[] bytes = verifier.getBytes("US-ASCII");
MessageDigest md = MessageDigest.getInstance("SHA-256");
md.update(bytes, 0, bytes.length);
byte[] digest = md.digest();
String challenge = Base64.encodeBase64URLSafeString(digest);
```

#### Swift 3 sample

```swift
// Dependency: Apple Common Crypto library
// http://opensource.apple.com//source/CommonCrypto
guard let data = verifier.data(using: .utf8) else { return nil }
var buffer = [UInt8](repeating: 0,  count: Int(CC_SHA256_DIGEST_LENGTH))
data.withUnsafeBytes {
    _ = CC_SHA256($0, CC_LONG(data.count), &buffer)
}
let hash = Data(bytes: buffer)
let challenge = hash.base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "\_")
    .replacingOccurrences(of: "=", with: "")
    .trimmingCharacters(in: .whitespaces)
```