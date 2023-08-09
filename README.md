# Customer Oauth with AURA.

Aura Oauth documentation v1

For help please contact:

Aaron Conder aaron@auraishere.com

## Introduction

To allow external applications to integrate with Aura’s frontend, we have an Oauth connection using the Authorisation Code workflow. This follows standard Oauth practices and allows customers of 3rd parties to connect their Aura account to authorised platforms.

Authorisation Code workflow involves requesting then exchanging an auth code for an access token, that can then be used to request data for the single user of that token.

Tokens are long-lived with a 2-year lifespan. Tokens can be refreshed before their expiry using the grant_type of `refresh_token`.

At this time the only endpoint available after authentication is to request a customer's personal information. Once this has been requested, the 3rd party can use our standard API with the customers membership ID to update their account.

The endpoints are scoped to each Aura client so a different URL will be provided for each integration.

Client credentials and secrets will be provided upon request. Return redirect URLs are to be supplied by the 3rd party to be whitelisted against the client.

## Workflow steps

- Generate a login request link for the customer
- Redirect the customer to the login screen to authenticate with Aura
- Customer is returned to the 3rd party provided URL
- The 3rd party application converts the returned code into an access token
- The 3rd party application uses that access token to retrieve customer data


## Step 1

The first step is to generate a login link to supply to your users. This is a single request to the ```/oauth/authorize``` endpoint:

Create redirect URL for the customer:

```
https://{domain}/oauth/authorize?client_id={clientId}&redirect_uri={redirectUri}&response_type=code
```

When a user is sent to this URL they will be prompted to log in to the client portal:

![img.png](public/img.png)

Once the user has authenticated they will be redirected to the whitelisted redirect_uri supplied in the request, along with an authorisation code:

```
https://{domain}/auth/callback?code=def502006e76f9bf8381103e3a8abeed57d2adb4bf664a932820bc966b31750ca58dea8d1e8d7a3de0bde9344198dd8550ae207b665052ceebb25389eab9a8dd1b791db67ba7dd3e87208e3a550b8232de6f8c29e32afe33d41dc12faa43f0c1a2cde8869b8c881083fb1208558503e46ea1f4da41105e138688e0e511284cd5bd45321b6e72f1a0e004a5153620e38510644423fcdd67d2993cee40046ed38059670054159289a4fe4f29420e5389fef8af60f44e7e78c05575cc2169710599f8d314cf184edc8e8ddf47321260447298b7c5db64873e893a636d6610a6f2210a7f2007c2b015cceaa93b2f2b9f75513f608ab19af1d073b11ae2685796144065283891531c72a748fe80651e68671d5d858f627788e275cff3f4ea787d27a5380aace2b81fb0468145f992ccea32eb1f366b5cbf93436bf752919c29b365e8fc16101ddc3bd3bb26414eb43ff8f90f6ca56186ad5f250ea8f2a4048f4a0b429e5d2f73a392af694d1d028cbe4a349b5370aa09afb7008da4f4dce11ededce40140e777abad0ad36bc286187c458d0be9b0fc6db673f5af86cc0d88bfa84256b8163cd0f98f06e9c1baa081a4a5d4628bb3cd89
```

The code param supplied then needs to be converted to an access token in the next step.

## Step 2

Once an authorisation code has been created, this now needs to be converted to a long life access token that will grant access to the users information.

##### Required form data for POST request
```js
grant_type
client_id
client_secret
redirect_url
code
```

The grant_type for converting a code to a token is `authorization_code`. The `client_id` and `client_secret` will be supplied for each Oauth client that is created.

```
POST https://{domain}/oauth/token
```

##### Headers
```
Content-Type: multipart/form-data;
```

##### POST data example:
```
grant_type: authorization_code
client_id: {client_id}
client_secret: {client_secret}
redirect_uri: https://{domain}/auth/callback
code: def502006e76f9bf8381103e3a8abeed57d2adb4bf664a932820bc966b31750ca58dea8d1e8d7a3de0bde9344198dd8550ae207b665052ceebb25389eab9a8dd1b791db67ba7dd3e87208e3a550b8232de6f8c29e32afe33d41dc12faa43f0c1a2cde8869b8c881083fb1208558503e46ea1f4da41105e138688e0e511284cd5bd45321b6e72f1a0e004a5153620e38510644423fcdd67d2993cee40046ed38059670054159289a4fe4f29420e5389fef8af60f44e7e78c05575cc2169710599f8d314cf184edc8e8ddf47321260447298b7c5db64873e893a636d6610a6f2210a7f2007c2b015cceaa93b2f2b9f75513f608ab19af1d073b11ae2685796144065283891531c72a748fe80651e68671d5d858f627788e275cff3f4ea787d27a5380aace2b81fb0468145f992ccea32eb1f366b5cbf93436bf752919c29b365e8fc16101ddc3bd3bb26414eb43ff8f90f6ca56186ad5f250ea8f2a4048f4a0b429e5d2f73a392af694d1d028cbe4a349b5370aa09afb7008da4f4dce11ededce40140e777abad0ad36bc286187c458d0be9b0fc6db673f5af86cc0d88bfa84256b8163cd0f98f06e9c1baa081a4a5d4628bb3cd89
```

#### Response example:

```json
{
  "token_type": "Bearer",
  "expires_in": 63158400,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OWFkYjBhYS0xN2ZjLTQ1NzgtODIyNi1lNDVlNGQzZTkxNTYiLCJqdGkiOiIwY2FlMTY2NTY0MzgzZjExNGYxZTVkYjhiYThiOGRlYzUyNGUzM2JhMTJlNzUzNTA0OWEzYTJmYTU4NWE3YjE2NTJmN2FlMGQ4OTM1YjA4OCIsImlhdCI6MTY4OTcxMzI5My4yMzYxMTMsIm5iZiI6MTY4OTcxMzI5My4yMzYxMTYsImV4cCI6MTc1Mjg3MTY5My4yMTYxMzIsInN1YiI6IjYxMmU3ZWQ4LWRhMjYtNGM5Zi04MjQ3LTU1NTliODJkZTMyOCIsInNjb3BlcyI6W119.Z6Cb8lUNe8XN0SesyJFQs8mtEWV-kn9H2EtB5ufuwUFnhi6LXRe7vKb4EzG-N1JI47-HMd1M-CEZcxPx-uYRx1zVJ8cK7HQLLF6xYvbrGq1-69iUB3dFK-VIkY_Z73h239wMUCEjE-xkvrhbKLLBsEtxd2VsSrEBYPwQLSHieh-FKn2BZ__F39eGWxLTBO-a6_d2oYUkxmXqtu5wwEFAo3jSTTOUA4L2jrxKsdN51cnLeDavt5ew9NdaE5WcOhXRbV1VrS22NdtHhY7wXUSzmerQU210xjeBSolpuDTGC8Vv4oTVqn8QY0dA4z1WVZJFqY-TyIq8UajIOj--NP9W4BDsjMFgetnUygq5ChLImq-24Xw9yro103GWggvFcimIzq7-38pNAvv96UdSgvSwd6JXXNyT6Q2_TkgjWnaGb8-EKZmo0hiQLbfnV2hL5Twgi64qgUJeB5c310SzO082Dve_pt57AFYZfrgR7dtQyTe8v446LoYT8v2qkc23_DQDGgygu1zHLZF6VnibARfBDdTwUhqr2GcHnwU4TujjNa35lmVsUNjEIIQTP6siGSqiqXF19g9UWJyZ2VROar5SZIYc4-DVj_MxXk2bw6KfaThg6idP6D8fSVU4HvlOEORvrbrWs8x5yFEsi8jjETpG-0ApXXbLYW7z-qC5Cx_UFsY",
  "refresh_token": "def50200cdd739b40ee7e663b83b75c8a2ca9229726fb627bd98794382cacca916c51055e42b9f64832947a367b55d9d8d20fe025bae5cba8f6705e3dd24aa17aa673bf49fdf4c707d76749e450372080e08ec867872fbd4a8e63412251fc529517d5d64a774f905afdb698463bf726d1b348b16557cc773cefbedb6f88abb5c3231c841e8eaaed60f4f22700c7ff28295e76c404ab5dec4f61d5a864c68ffd03223abeff7366fdaf4e36a605503eaecdb4a661781e1306d919ebe1da91831220124a7f656aeba65cebe928ffc9852458be4075a76ac4200fdf9146c7f88d26b91fafaef8bf89dcbebb6814041fd1209582ce88c7e9dbb7918be2c777e3c28056f53eaf9b25217c82d93c5d3a9dc4f80111ac32815d8a4fbecb1ac61530dbeb3d34d2e19a1a5cb2b0ff96365662098380c33d67d41a679a4caaf40a1e52e8eac8bdfa15ac6879ba942facf4292e04f3a0f6c5a4ba316ef3c2c5a15a23efa18998a027f4ccf5fa72ad4ca579ceddf902f5dc01afe0ab1a75b456103937953bf1834d4712d7e8c14260224f6074b0c265406c33f99a29fae15e740729d9953a5c26fb1ddcf196ba4f335"
}
```

The returned ```access_token``` will then be used to query the customer's information.


## Step 3

Finally once the access_token has been generated it can be used as an Authentication token to retrieve the customer data.

```
GET https://{domain}/oauth/user?include=memberships
```

##### Headers:

```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {access_token}
```

##### Response

```json
{
  "data": {
    ...
    "id": "d9dc02bf-b88f-40bc-b423-bc369f545067",
    "first_name": "Test",
    "last_name": "Name",
    "email": "email@example.com",
    "phone": "021111111",
    "created_at": "2020-08-24 00:00:00",
    "birth_date": "1990-05-17 00:00:00",
    ...
    "memberships": {
      "data": [
        {
          "id": "400c4513-700a-41f4-aa53-31a9d686c334",
          "member_id": "612e7ed8-da26-4c9f-8247-5559b82de328",
          ...
          "points": 548.3,
          "expiring": 448.28,
          ...
        }
      ]
    }
  }
}
```

Once this data has been retrieved by the 3rd party application, the member ids can be used within the full Aura API to interact with the customer.

The full API docs are available here: https://auraishere.stoplight.io/docs/api-doc/

## Refresh tokens

While the tokens have a long life, you may be required to refresh the token for it to be used again. To refresh a token you will make a similar request to convert a token but instead pass the `refresh_token` generated at step 2.

##### Required form data for POST request
```js
grant_type
client_id
client_secret
code
```

The grant_type for converting a code to a token is `refresh_token`

```
POST https://{domain}/oauth/token
```

##### Headers
```
Content-Type: multipart/form-data;
```

##### POST data example:
```
grant_type: refresh_token
client_id: {client_id}
client_secret: {client_secret}
refresh_token: def50200cdd739b40ee7e663b83b75c8a2ca9229726fb627bd98794382cacca916c51055e42b9f64832947a367b55d9d8d20fe025bae5cba8f6705e3dd24aa17aa673bf49fdf4c707d76749e450372080e08ec867872fbd4a8e63412251fc529517d5d64a774f905afdb698463bf726d1b348b16557cc773cefbedb6f88abb5c3231c841e8eaaed60f4f22700c7ff28295e76c404ab5dec4f61d5a864c68ffd03223abeff7366fdaf4e36a605503eaecdb4a661781e1306d919ebe1da91831220124a7f656aeba65cebe928ffc9852458be4075a76ac4200fdf9146c7f88d26b91fafaef8bf89dcbebb6814041fd1209582ce88c7e9dbb7918be2c777e3c28056f53eaf9b25217c82d93c5d3a9dc4f80111ac32815d8a4fbecb1ac61530dbeb3d34d2e19a1a5cb2b0ff96365662098380c33d67d41a679a4caaf40a1e52e8eac8bdfa15ac6879ba942facf4292e04f3a0f6c5a4ba316ef3c2c5a15a23efa18998a027f4ccf5fa72ad4ca579ceddf902f5dc01afe0ab1a75b456103937953bf1834d4712d7e8c14260224f6074b0c265406c33f99a29fae15e740729d9953a5c26fb1ddcf196ba4f335
```

#### Response example:

```json
{
  "token_type": "Bearer",
  "expires_in": 63158400,
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5OWFlNjFiZi04ZDEyLTRjMjktYTIyYy0yYzUzMjRkZjRiMzAiLCJqdGkiOiJhYTU4YmVhYjU0OTYyOGVhMTU4ZjBhZDFlYjgyNDA0N2IyMWFhNTMzZGE0OGM5YzI4MGQ4OTE2ODQ3MWFmMDQzYWYxM2ViYmQwMTg3ODRiZCIsImlhdCI6MTY4OTc0MzM4NC43Mzg5OSwibmJmIjoxNjg5NzQzMzg0LjczODk5MywiZXhwIjoxNzUyOTAxNzg0LjczMDQ0Nywic3ViIjoiZDlkYzAyYmYtYjg4Zi00MGJjLWI0MjMtYmMzNjlmNTQ1MDY3Iiwic2NvcGVzIjpbXX0.Y4ka4tYvdYKlMGYdAss4z4wNQQxjjBbkftxnIRx6sQR-8OEpQ7neoqooj2PB9p0BOtJpbYZJMAQlQJIVjzpR0e3yMEp8CpMXKNjXutJEVR4qsvQ9k_q365JhZmHsMtTXh6sBfU4_KIBVrzBYrZwtGG7haaGJ-JjspkGJtd9zgMP2SuiVxUwnxuhDfUbfiA1gLWY-9p_n304yMCECD4uAVhQHSfICQaz3zv7egml4HovQSGsm-Pq_4jEURszHD9ItY_qxTugScLAu7sMA25d5odLAp7ACHnNsuQrfvB4XHaK8Dtr1lLg36UhBcHZ7Aa4xQdZv9iAokwX-5LqRk8xEDNKP7PfkJyiEfxyPCWiyBaMMehJVRFkj3bsPcKuLNIelFRWPOqme64u5GrdFff2YhU-zywPybK0PKCNNwmjLj8N3PnFiaSn7W76vPUdZ0HlaCpLmNucig2C9l1mf3HJJINxqawL5yE0EnLpSOmmt1e08tQ5AirE0fZxihFGWv_SkuzVT2LjgyUzkPN6b9RGMNrDdlFBfTJi0mMbqYaJAlPgdsopn_8NRoKZ8B5BOje7_gpO17-zYNn9sStVhZ4-RdndXdhyDmSI1CGESQEgqzHmBI8eNn2MYYKnISVQ4GQ1Nq63GSiyIlkPlrqdM43s7hU6hEiHYOZmVOP00aUz_sH4",
  "refresh_token": "def502001dfe3865f2e48182a98d1bb98e9df0d33ce308810899c10386f3c614c43d817bd3c332ae30eae27f29dba4a505b445596583d7f9bc22f430914729a7eba6851e125de06953d3057e2f31858c64d67c9f3573a8fd163f935b43e63644e29e0b5b01afd6e66e67bf723154f9f057b2375d5437d0428da4bbd16f710bb4c12f2eeae2cfcf36bea206c00781b8817f3f482f3fc546b5cc680be61d52c47954dce361f97919ab8a7e2a6d9e897b2261bc234785483d980a0eeac0a6892dd60b469189efc04a06dd851e4b479b96b0a22a5fee7cf913b846086314fd6d13ff009b89abc24ad869a22ddf53c196503b14eb7c39d932c54773d56b63e58097b059fce62cb4a37ff948b1e6df740fb4c819e1d9dabec414216bcdf0685489ee0de7d9afe7b2a87dc71c84065fc365ca459c723a31369d2f59d997fcc38a5a1e6808520d13273a943dc6a9c24d80be378247283f19e689b475ec18f18c5be82c4a4f61278ebe40f49b3e2a5732f427884f61b8c4520ff6fd882bd32eadeae78b1e9f6e8ebe46284b187d8cfd217c1d62380b360e8fa8bc4b3e1724cbbfa2759466ea7829c51c31c17b52"
}
```