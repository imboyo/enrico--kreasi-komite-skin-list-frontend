# File API Documentation

Base URL: `/file`

> **Auth required** — All endpoints require a valid access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. Stream File

Read a stored file as a stream. The response is sent with `Content-Disposition: inline` so supported file types can be previewed by the browser.

- **Method:** `GET`
- **URL:** `/file/:fileUuid`
- **Status:** `200 OK`
- **Auth:** `AuthGuard` (authenticated account)

### URL Params

| Field      | Type   | Required | Notes              |
|------------|--------|----------|--------------------|
| `fileUuid` | string | yes      | Stored file UUID   |

### Response `200 OK`

Returns the file binary stream.

### Response Headers

| Header                | Notes                                      |
|-----------------------|--------------------------------------------|
| `Content-Type`        | Stored file MIME type or octet-stream      |
| `Content-Disposition` | `inline; filename="<original_name>"`       |
| `Content-Length`      | Stored file size when available            |

---

## 2. Download File

Download a stored file as an attachment. The response is sent with `Content-Disposition: attachment` so browsers download it.

- **Method:** `GET`
- **URL:** `/file/:fileUuid/download`
- **Status:** `200 OK`
- **Auth:** `AuthGuard` (authenticated account)

### URL Params

| Field      | Type   | Required | Notes              |
|------------|--------|----------|--------------------|
| `fileUuid` | string | yes      | Stored file UUID   |

### Response `200 OK`

Returns the file binary stream.

### Response Headers

| Header                | Notes                                      |
|-----------------------|--------------------------------------------|
| `Content-Type`        | Stored file MIME type or octet-stream      |
| `Content-Disposition` | `attachment; filename="<original_name>"`   |
| `Content-Length`      | Stored file size when available            |

---

## Error Responses

- `401 Unauthorized` when the access token is missing or invalid.
- `404 Not Found` when the file record is missing, not active, deleted, or the physical stored file cannot be found.
