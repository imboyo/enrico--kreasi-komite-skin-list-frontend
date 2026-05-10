# Admin Skin Care API Documentation

Base URL: `/admin/default-skin-care`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List Default Skin Care

Retrieve a paginated list of default skin care records. This endpoint intentionally uses `POST` so the list query can be sent in the request body.

- **Method:** `POST`
- **URL:** `/admin/default-skin-care/list`
- **Auth:** `AdminGuard` (ADMIN role)

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
POST /admin/default-skin-care/list
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
```

---

## 2. Add Default Skin Care

Create a new default skin care record.

- **Method:** `POST`
- **URL:** `/admin/default-skin-care`
- **Auth:** `AdminGuard` (ADMIN role)

### Request Body

| Field         | Type   | Required | Notes |
|---------------|--------|----------|-------|
| `name`        | string | yes      | Max 255 chars |
| `description` | string | no       | Nullable |
| `category`    | enum   | yes      | One of `routine`, `make_up`, `barrier`, `colors`, `scars` |

### Example Request

```json
POST /admin/default-skin-care
{
  "name": "Barrier Repair Cream",
  "description": "Supports the skin barrier overnight",
  "category": "barrier"
}
```

### Response `201 Created`

Returns the created row.

---

## 3. Edit Default Skin Care

Update an existing default skin care record.

- **Method:** `PATCH`
- **URL:** `/admin/default-skin-care/:skinCareId`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter    | Type   | Description |
|--------------|--------|-------------|
| `skinCareId` | string | UUID of the default skin care row |

### Request Body

All fields are optional.

| Field         | Type   | Notes |
|---------------|--------|-------|
| `name`        | string | Max 255 chars |
| `description` | string | Send empty string or `null` to clear |

### Response `200 OK`

Returns the updated row.

### Error Responses

| Status | Description |
|--------|-------------|
| `404`  | Default skin care not found |

---

## 4. Delete Default Skin Care

Delete a default skin care record.

- **Method:** `DELETE`
- **URL:** `/admin/default-skin-care/:skinCareId`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter    | Type   | Description |
|--------------|--------|-------------|
| `skinCareId` | string | UUID of the default skin care row |

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
| `404`  | Default skin care not found |
