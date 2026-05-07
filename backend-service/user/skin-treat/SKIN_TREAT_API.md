# Skin Treat API Documentation

Base URL: `/user/skin-treat`

> **Auth required** — All endpoints require a valid `USER` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List Skin Treat

Retrieve a paginated list of skin treat records owned by the authenticated user. This endpoint uses `POST` so the list query can be sent in the request body.

- **Method:** `POST`
- **URL:** `/user/skin-treat/list`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Request Body

All fields are optional.

| Field      | Type      | Description                                        |
|------------|-----------|----------------------------------------------------|
| `page`     | number    | Page number, min 1. Default: `1`                  |
| `limit`    | number    | Items per page, min 1, max 100. Default: `10`     |
| `search`   | string    | ILIKE search across `name`, `description`, `category` |
| `sort`     | SortDto[] | Sort order for the allowed sort fields            |
| `filter`   | FilterDto | Dynamic filter using `and` / `or` condition groups |

#### Allowed Sort Fields

`uuid`, `name`, `description`, `category`, `created_at`, `updated_at`

#### Allowed Filter Fields

`uuid`, `name`, `description`, `category`, `created_at`, `updated_at`

#### SortDto

| Field       | Type   | Description                    |
|-------------|--------|--------------------------------|
| `field`     | string | One of the allowed sort fields |
| `direction` | string | `ASC` or `DESC`                |

#### FilterDto

| Field | Type         | Description                                  |
|-------|--------------|----------------------------------------------|
| `and` | FilterItem[] | All conditions must match (AND logic)        |
| `or`  | FilterItem[] | At least one condition must match (OR logic) |

#### FilterItem

| Field      | Type   | Required | Description                                                                                                               |
|------------|--------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `field`    | string | Yes      | One of the allowed filter fields                                                                                          |
| `operator` | string | Yes      | One of: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `like`, `ilike`, `in`, `notIn`, `isNull`, `isNotNull`, `between`, `notBetween` |
| `value`    | any    | No       | The value to compare against (omit for `isNull` / `isNotNull`)                                                            |

### Example Request

```json
POST /user/skin-treat/list
{
  "page": 1,
  "limit": 10,
  "search": "routine",
  "sort": [{ "field": "created_at", "direction": "DESC" }],
  "filter": {
    "and": [
      { "field": "category", "operator": "eq", "value": "colors" }
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
```

---

## 2. Create Skin Treat

Create a new skin treat record for the authenticated user.

- **Method:** `POST`
- **URL:** `/user/skin-treat`
- **Status:** `201 Created`
- **Auth:** `UserGuard` (USER role)

### Request Body

| Field         | Type   | Required | Description                                                              |
|---------------|--------|----------|--------------------------------------------------------------------------|
| `name`        | string | Yes      | Name of the skin treat item. Min 1, max 255 characters.                  |
| `description` | string | No       | Optional description.                                                    |
| `category`    | enum   | Yes      | One of: `routine`, `make_up`, `barrier`, `colors`, `scars`              |

### Example Request

```json
POST /user/skin-treat
{
  "name": "Daily Cleanser",
  "description": "Gentle cleanser for daily use",
  "category": "routine"
}
```

### Response `201 Created`

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "Daily Cleanser",
  "description": "Gentle cleanser for daily use",
  "category": "routine",
  "created_at": "2026-05-04T10:00:00.000Z",
  "updated_at": "2026-05-04T10:00:00.000Z"
}
```

---

## 3. Update Skin Treat

Update an existing skin treat record. Only `name` and `description` can be changed; `category` cannot be modified after creation.

- **Method:** `PATCH`
- **URL:** `/user/skin-treat/:skinTreatId`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Path Parameters

| Parameter    | Type   | Description                        |
|--------------|--------|------------------------------------|
| `skinTreatId` | string | UUID of the skin treat record.    |

### Request Body

All fields are optional.

| Field         | Type   | Description                                        |
|---------------|--------|----------------------------------------------------|
| `name`        | string | New name. Min 1, max 255 characters.               |
| `description` | string | New description. Pass `null` to clear it.          |

### Example Request

```json
PATCH /user/skin-treat/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
{
  "name": "Morning Cleanser",
  "description": null
}
```

### Response `200 OK`

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "Morning Cleanser",
  "description": null,
  "category": "routine",
  "created_at": "2026-05-04T10:00:00.000Z",
  "updated_at": "2026-05-05T08:00:00.000Z"
}
```

### Error Responses

| Status | Description                                           |
|--------|-------------------------------------------------------|
| `404`  | Skin treat not found or does not belong to the user.  |

---

## 4. Delete Skin Treat

Delete a skin treat record owned by the authenticated user.

- **Method:** `DELETE`
- **URL:** `/user/skin-treat/:skinTreatId`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Path Parameters

| Parameter    | Type   | Description                        |
|--------------|--------|------------------------------------|
| `skinTreatId` | string | UUID of the skin treat record.    |

### Example Request

```
DELETE /user/skin-treat/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Error Responses

| Status | Description                                           |
|--------|-------------------------------------------------------|
| `404`  | Skin treat not found or does not belong to the user.  |
