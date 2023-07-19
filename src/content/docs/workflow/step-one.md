---
title: Generate login request 
description: Generate login request for customer 
---

The first step is to generate a login link to supply to your users. This is a single request to the ```/oauth/authorize``` endpoint:

Create URL for customer:
```
https://{domain}/oauth/authorize?client_id={clientId}&redirect_uri=https://{clientDomain}/callback&response_type=code
```

When a user is sent to this URL they will be prompted to login:



Once the user has authenticated they will be redirected to the whitelisted redirect_uri supplied in the request, along with an authorisation code:

```
https://{domain}/auth/callback?code=def502006e76f9bf8381103e3a8abeed57d2adb4bf664a932820bc966b31750ca58dea8d1e8d7a3de0bde9344198dd8550ae207b665052ceebb25389eab9a8dd1b791db67ba7dd3e87208e3a550b8232de6f8c29e32afe33d41dc12faa43f0c1a2cde8869b8c881083fb1208558503e46ea1f4da41105e138688e0e511284cd5bd45321b6e72f1a0e004a5153620e38510644423fcdd67d2993cee40046ed38059670054159289a4fe4f29420e5389fef8af60f44e7e78c05575cc2169710599f8d314cf184edc8e8ddf47321260447298b7c5db64873e893a636d6610a6f2210a7f2007c2b015cceaa93b2f2b9f75513f608ab19af1d073b11ae2685796144065283891531c72a748fe80651e68671d5d858f627788e275cff3f4ea787d27a5380aace2b81fb0468145f992ccea32eb1f366b5cbf93436bf752919c29b365e8fc16101ddc3bd3bb26414eb43ff8f90f6ca56186ad5f250ea8f2a4048f4a0b429e5d2f73a392af694d1d028cbe4a349b5370aa09afb7008da4f4dce11ededce40140e777abad0ad36bc286187c458d0be9b0fc6db673f5af86cc0d88bfa84256b8163cd0f98f06e9c1baa081a4a5d4628bb3cd89
```

The code param supplied then needs to be converted to an access token in the next step.
