# Skin Goal API Documentation

Base URL: `/user/skin-goal`

> **Auth required** — All endpoints require a valid `USER` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List Skin Goals

Retrieve a paginated list of skin goals owned by the authenticated user. Uses `POST` so the list query can be sent in the request body.

- **Method:** `POST`
- **URL:** `/user/skin-goal/list`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Request Body

All fields are optional.

| Field    | Type      | Description                                    |
|----------|-----------|------------------------------------------------|
| `page`   | number    | Page number, min 1. Default: `1`              |
| `limit`  | number    | Items per page, min 1, max 100. Default: `10` |
| `search` | string    | ILIKE search across `name`, `description`     |
| `sort`   | SortDto[] | Sort order for the allowed sort fields        |
| `filter` | FilterDto | Dynamic filter using the allowed filter fields|

#### Allowed Sort Fields

`uuid`, `name`, `description`, `created_at`, `updated_at`

#### Allowed Filter Fields

`uuid`, `name`, `description`, `created_at`, `updated_at`

### Example Request

```json
POST /user/skin-goal/list
{
  "page": 1,
  "limit": 10,
  "search": "clear",
  "sort": [{ "field": "created_at", "direction": "DESC" }]
}
```

### Response `200 OK`

```json
{
  "data": [
    {
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "Clear Skin",
      "description": "Reduce acne and blemishes",
      "created_at": "2026-05-05T10:00:00.000Z",
      "updated_at": "2026-05-05T10:00:00.000Z"
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

## 2. Add Skin Goal

Create a new skin goal for the authenticated user.

- **Method:** `POST`
- **URL:** `/user/skin-goal`
- **Status:** `201 Created`
- **Auth:** `UserGuard` (USER role)

### Request Body

| Field         | Type   | Required | Notes         |
|---------------|--------|----------|---------------|
| `name`        | string | yes      | Max 255 chars |
| `description` | string | no       | Nullable      |

### Example Request

```json
POST /user/skin-goal
{
  "name": "Clear Skin",
  "description": "Reduce acne and blemishes"
}
```

### Response `201 Created`

Returns the created row.

---

## 3. Update Skin Goal

Update an existing skin goal owned by the authenticated user.

- **Method:** `PATCH`
- **URL:** `/user/skin-goal/:skinGoalId`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Path Parameters

| Parameter    | Type   | Description                    |
|--------------|--------|--------------------------------|
| `skinGoalId` | string | UUID of the skin goal row      |

### Request Body

All fields are optional.

| Field         | Type   | Notes                                       |
|---------------|--------|---------------------------------------------|
| `name`        | string | Max 255 chars                               |
| `description` | string | Send empty string or `null` to clear        |

### Response `200 OK`

Returns the updated row.

### Error Responses

| Status | Description          |
|--------|----------------------|
| `404`  | Skin goal not found  |

---

## 4. Delete Skin Goal

Delete a skin goal owned by the authenticated user.

- **Method:** `DELETE`
- **URL:** `/user/skin-goal/:skinGoalId`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Path Parameters

| Parameter    | Type   | Description               |
|--------------|--------|---------------------------|
| `skinGoalId` | string | UUID of the skin goal row |

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

### Error Responses

| Status | Description          |
|--------|----------------------|
| `404`  | Skin goal not found  |
