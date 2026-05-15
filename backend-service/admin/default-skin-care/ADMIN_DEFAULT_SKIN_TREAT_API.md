# Admin Skin Treat API Documentation

Base URL: `/admin/default-skin-treat`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

## 1. List Default Skin Treat

Retrieve a paginated list of default skin treat records for the admin dashboard.
This endpoint uses `POST` so filter and sort objects can be sent in the request body.

- **Method:** `POST`
- **URL:** `/admin/default-skin-treat/list`
- **Auth:** `AdminGuard` (ADMIN role)

### Request Body

All fields are optional.

| Field      | Type      | Description |
|------------|-----------|-------------|
| `page`     | number    | Page number, min 1. Default: `1` |
| `limit`    | number    | Items per page, min 1, max 100. Default: `10` |
| `search`   | string    | Search across `name`, `description`, and `category` |
| `sort`     | SortDto[] | Sort order for allowed fields |
| `filter`   | FilterDto | Dynamic filter object |

#### Allowed Sort Fields

`uuid`, `name`, `description`, `category`, `created_at`, `updated_at`

#### Allowed Filter Fields

`uuid`, `name`, `description`, `category`, `created_at`, `updated_at`

### Example Request

```json
POST /admin/default-skin-treat/list
{
  "page": 1,
  "limit": 20,
  "search": "barrier",
  "sort": [{ "field": "updated_at", "direction": "DESC" }],
  "filter": {
    "and": [{ "field": "category", "operator": "eq", "value": "barrier" }]
  }
}
```

### Response `200 OK`

```json
{
  "data": [
    {
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "name": "Barrier Repair Cream",
      "description": "Supports the skin barrier overnight",
      "category": "barrier",
      "created_at": "2026-05-04T10:00:00.000Z",
      "updated_at": "2026-05-05T08:30:00.000Z"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "total_pages": 1
  }
}
```

---

## 2. Add Default Skin Treat

Create a new default skin treat record.

- **Method:** `POST`
- **URL:** `/admin/default-skin-treat`
- **Auth:** `AdminGuard` (ADMIN role)

### Request Body

| Field         | Type   | Required | Notes |
|---------------|--------|----------|-------|
| `name`        | string | yes      | Max 255 chars |
| `description` | string | no       | Nullable |
| `category`    | enum   | yes      | One of `routine`, `make_up`, `barrier`, `colors`, `scars`, `contour`, `fats`, `hairs` |

### Example Request

```json
POST /admin/default-skin-treat
{
  "name": "Barrier Repair Cream",
  "description": "Supports the skin barrier overnight",
  "category": "barrier"
}
```

### Response `201 Created`

Returns the created row.

---

## 3. Edit Default Skin Treat

Update an existing default skin treat record.

- **Method:** `PATCH`
- **URL:** `/admin/default-skin-treat/:skinTreatId`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter    | Type   | Description |
|--------------|--------|-------------|
| `skinTreatId` | string | UUID of the default skin treat row |

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
| `404`  | Default skin treat not found |

---

## 4. Delete Default Skin Treat

Delete a default skin treat record.

- **Method:** `DELETE`
- **URL:** `/admin/default-skin-treat/:skinTreatId`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter    | Type   | Description |
|--------------|--------|-------------|
| `skinTreatId` | string | UUID of the default skin treat row |

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
| `404`  | Default skin treat not found |
