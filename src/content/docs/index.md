---
title: Introduction 
description: A reference page for Oauth with AURA.
---

### An introduction into Oauth with AURA. 

To allow external applications to integrate with Aura’s frontend, we have an Oauth connection using the Authorisation Code workflow. This follows standard Oauth practices and allows customers of 3rd parties to connect their Aura account to authorised platforms.

Authorisation Code workflow involves requesting then exchanging an auth code for an access token, that can then be used to request data for the single user of that token.

Tokens are long lived with a 2 year lifespan. Tokens can be refreshed using the refresh grant_type of xx

At this time the only endpoint available after authentication is to request a customer's personal information. Once this has been requested, the 3rd party can use our standard API with the customers membership ID to update their account.

The endpoints are scoped to each Aura client so a different URL will be provided for each integration.

Client credentials and secrets will be provided upon request. Return redirect URLs are to be supplied by the 3rd party to be whitelisted against the client.

## Workflow steps

- [Generate a login request link for the customer](/workflow/step-one)
- Redirect the customer to the login screen to authenticate with Aura
- Customer is returned to the 3rd party provided URL
- The 3rd party application converts the returned code into an access token
- The 3rd party application uses that access token to retrieve customer data

