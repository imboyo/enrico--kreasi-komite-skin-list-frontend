# Admin User Skin Treat API Documentation

Base URL: `/admin/user/skin-treat`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List User Skin Treat

Retrieve a paginated list of user skin treat records. This endpoint uses `POST` so the list query can be sent in the request body.

- **Method:** `POST`
- **URL:** `/admin/user/skin-treat/list`
- **Status:** `200 OK`

### Request Body

All fields are optional.

| Field    | Type      | Description |
|----------|-----------|-------------|
| `page`   | number    | Page number, min `1`. Default: `1` |
| `limit`  | number    | Items per page, min `1`, max `100`. Default: `10` |
| `search` | string    | ILIKE search across `name`, `description`, `user_account.full_name`, `user_account.email`, `user_account.phone_number` |
| `sort`   | SortDto[] | Sort order for allowed fields |
| `filter` | FilterDto | Dynamic filter for allowed fields |
| `populate` | string[] | Optional extra relations. `user` and `user.account` are already included automatically |

### Allowed Sort Fields

`uuid`, `name`, `description`, `category`, `is_check`, `created_at`, `updated_at`, `user_account.full_name`, `user_account.created_at`

### Allowed Filter Fields

`uuid`, `name`, `description`, `category`, `is_check`, `created_at`, `updated_at`, `user_account.uuid`, `user_account.full_name`, `user_account.email`, `user_account.phone_number`, `user_account.status`

### Example Request

```json
POST /admin/user/skin-treat/list
{
  "page": 1,
  "limit": 10,
  "search": "cleanser",
  "sort": [{ "field": "created_at", "direction": "DESC" }],
  "filter": {
    "and": [
      { "field": "user_account.status", "operator": "eq", "value": "ACTIVE" }
    ]
  }
}
```

### Response `200 OK`

```json
{
  "data": [
    {
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "Daily Cleanser",
      "description": "Gentle cleanser for daily use",
      "category": "routine",
      "is_check": false,
      "created_at": "2026-05-04T10:00:00.000Z",
      "updated_at": "2026-05-04T10:00:00.000Z",
      "user": {
        "uuid": "uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu",
        "account": {
          "uuid": "uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu",
          "full_name": "John User",
          "email": "john.user@example.com",
          "phone_number": "+6281234567890",
          "status": "ACTIVE"
        }
      }
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
```

---

## 2. Get User Skin Treat Detail

Retrieve one skin treat record together with the owning user account.

- **Method:** `GET`
- **URL:** `/admin/user/skin-treat/:skinTreatId`
- **Status:** `200 OK`

### Error Responses

| Status | Description |
|--------|-------------|
| `404`  | Skin treat not found |

---

## 3. Update User Skin Treat

Update an existing user skin treat record.

- **Method:** `PATCH`
- **URL:** `/admin/user/skin-treat/:skinTreatId`
- **Status:** `200 OK`

### Request Body

All fields are optional.

| Field         | Type    | Notes |
|---------------|---------|-------|
| `name`        | string  | Min `1`, max `255` chars |
| `description` | string  | Send empty string or `null` to clear |
| `category`    | enum    | One of `routine`, `make_up`, `barrier`, `colors`, `scars`, `contour`, `fats`, `hairs` |
| `is_check`    | boolean | Mark whether the item is checked |

### Error Responses

| Status | Description |
|--------|-------------|
| `404`  | Skin treat not found |

---

## 4. Delete User Skin Treat

Delete a user skin treat record.

- **Method:** `DELETE`
- **URL:** `/admin/user/skin-treat/:skinTreatId`
- **Status:** `200 OK`

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Error Responses

| Status | Description |
|--------|-------------|
| `404`  | Skin treat not found |
