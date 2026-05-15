# Default Skin Treat API Documentation

Base URL: `/default-skin-treat`

> **Public endpoint** — No authentication is required.

---

## 1. List Default Skin Treat

Retrieve a paginated list of default skin treat records. This endpoint intentionally uses `POST` so the list query can be sent in the request body.

- **Method:** `POST`
- **URL:** `/default-skin-treat/list`
- **Auth:** None

### Request Body

All fields are optional.

| Field      | Type      | Description                                        |
|------------|-----------|----------------------------------------------------|
| `page`     | number    | Page number, min 1. Default: `1`                  |
| `limit`    | number    | Items per page, min 1, max 100. Default: `10`     |
| `search`   | string    | ILIKE search across `name`, `description`, `category` |
| `sort`     | SortDto[] | Sort order for the allowed sort fields            |
| `filter`   | FilterDto | Dynamic filter using the allowed filter fields    |

#### Allowed Sort Fields

`uuid`, `name`, `description`, `category`, `created_at`, `updated_at`

#### Allowed Filter Fields

`uuid`, `name`, `description`, `category`, `created_at`, `updated_at`

### Example Request

```json
POST /default-skin-treat/list
{
  "page": 1,
  "limit": 10,
  "search": "routine",
  "sort": [{ "field": "created_at", "direction": "DESC" }]
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
      "created_at": "2026-05-04T10:00:00.000Z",
      "updated_at": "2026-05-04T10:00:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "total_pages": 1
  }
}
