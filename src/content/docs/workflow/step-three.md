---
title: Retrieve customer data 
description: Retrieve customer data
---

Finally once the access_token has been generated it can be used as an Authentication token to retrieve the customer data.

```
GET https://{domain}/oauth/user?include=memberships
```

Headers: 

```
Accept: application/json
Content-Type: application/json
Authorization: Bearer {token}
```

Response
```json
{
    "data": {
        "id": "612e7ed8-da26-4c9f-8247-5559b82de328",
        "team_id": 13,
        "team_name": "Aura Tech Test",
        "title": null,
        "first_name": "Aaron",
        "last_name": "Conder",
        "email": "aaron@weareonfire.co.nz",
        "phone": "+64211734477",
        "created_at": "2020-08-24 02:07:04",
        "birth_date": "1990-05-17 00:00:00",
        "user_data": {
            "preferences": {
                "subscribed": false
            }
        },
        "verified": 1,
        "verified_at": "2020-08-24 02:08:20",
        "force_validation": null,
        "suspended": 0,
        "receive_monthly_summary_email": 1,
        "receive_inactivity_email": 1,
        "memberships": {
            "data": [
                {
                    "id": "400c4513-700a-41f4-aa53-31a9d686c334",
                    "member_id": "612e7ed8-da26-4c9f-8247-5559b82de328",
                    "team_id": 13,
                    "scheme_id": 19,
                    "scheme_name": "Aura Tech Test",
                    "account": "5ba7c3c4-5389-41c2-851c-d80e987cc258",
                    "points": 548.3,
                    "expiring": 448.28,
                    "last_transacted_at": "2023-07-18 04:42:59",
                    "current_level": {
                        "id": 21,
                        "team_id": 13,
                        "scheme_id": 19,
                        "scheme_name": "Aura Tech Test",
                        "name": "Base",
                        "earn_percent": "0.10",
                        "redeem_percent": "1.00",
                        "birthday_points": 10,
                        "default_expiry_days": 186,
                        "levelling_threshold": 0
                    },
                    "created_at": "2020-08-24 02:07:04",
                    "membership_types": [
                        {
                            "id": 34,
                            "team_id": 13,
                            "name": "Member Type 1",
                            "deleted_at": null,
                            "created_at": "2021-01-12T21:02:00.000000Z",
                            "updated_at": "2021-01-12T21:02:00.000000Z",
                            "pivot": {
                                "membership_id": "400c4513-700a-41f4-aa53-31a9d686c334",
                                "membership_type_id": 34,
                                "created_at": "2021-03-08T04:29:57.000000Z",
                                "updated_at": "2021-03-08T04:29:57.000000Z"
                            }
                        }
                    ],
                    "contributing_accounts": []
                }
            ]
        }
    }
}
```
