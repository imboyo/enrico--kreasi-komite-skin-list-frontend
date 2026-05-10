# Admin Account User API Documentation

Base URL: `/admin/account/user`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List User Accounts

Retrieve a paginated list of user accounts. Supports the shared `ListQueryDto` contract for search, sort, and filter. The listing is always scoped to accounts with the `USER` role.

> **Visibility rule** — Only accounts with `ACTIVE` or `INACTIVE` status are returned. Accounts with `INITIALIZING` or `TO_DELETED` status are hidden from the list.

- **Method:** `POST`
- **URL:** `/admin/account/user/list`
- **Status:** `200 OK`

### Request Body

All fields are optional.

| Field    | Type      | Description |
|----------|-----------|-------------|
| `page`   | number    | Page number, min `1`. Default: `1` |
| `limit`  | number    | Items per page, min `1`, max `100`. Default: `10` |
| `search` | string    | ILIKE search across `full_name`, `email`, `phone_number` |
| `sort`   | SortDto[] | Sort order for allowed fields |
| `filter` | FilterDto | Dynamic filter for allowed fields |

### Allowed Sort / Filter Fields

`uuid`, `full_name`, `email`, `phone_number`, `role`, `status`, `auth_field_updated_at`, `created_at`, `updated_at`

### Example Request

```json
POST /admin/account/user/list
{
  "page": 1,
  "limit": 20,
  "search": "john",
  "sort": [{ "field": "created_at", "direction": "DESC" }]
}
```

### Response `200 OK`

```json
{
  "data": [
    {
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "full_name": "John User",
      "email": "john.user@example.com",
      "phone_number": "+6281234567890",
      "role": "USER",
      "status": "ACTIVE",
      "auth_field_updated_at": "2026-05-04T02:30:00.000Z",
      "created_at": "2026-05-01T08:00:00.000Z",
      "updated_at": "2026-05-04T02:30:00.000Z",
      "profile_photo": {
        "uuid": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
        "original_name": "avatar.png",
        "filename": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy.png",
        "category": "profile-photos",
        "size": 2048,
        "mime_type": "image/png",
        "path": "https://storage.example.com/profile-photos/yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy.png",
        "created_at": "2026-05-01T08:00:00.000Z",
        "updated_at": "2026-05-01T08:00:00.000Z"
      }
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

## 2. Get User Account Detail

Retrieve detailed information for a single user account, including the profile photo.

> **Visibility rule** — Only accounts with `ACTIVE` or `INACTIVE` status can be retrieved. Accounts with `INITIALIZING` or `TO_DELETED` status will return `404 Not Found`.

- **Method:** `GET`
- **URL:** `/admin/account/user/:userId`
- **Status:** `200 OK`

### Example Request

```
GET /admin/account/user/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Response `200 OK`

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "full_name": "John User",
  "email": "john.user@example.com",
  "phone_number": "+6281234567890",
  "role": "USER",
  "status": "ACTIVE",
  "auth_field_updated_at": "2026-05-04T02:30:00.000Z",
  "created_at": "2026-05-01T08:00:00.000Z",
  "updated_at": "2026-05-04T02:30:00.000Z",
  "profile_photo": {
    "uuid": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
    "original_name": "avatar.png",
    "filename": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy.png",
    "category": "profile-photos",
    "size": 2048,
    "mime_type": "image/png",
    "path": "https://storage.example.com/profile-photos/yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy.png",
    "created_at": "2026-05-01T08:00:00.000Z",
    "updated_at": "2026-05-01T08:00:00.000Z"
  }
}
```

### Response `404 Not Found`

```json
{
  "statusCode": 404,
  "message": "User account xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx not found",
  "error": "Not Found"
}
```

---

## 3. Update User Account

Update user profile fields except the password. Unique email and phone number checks are applied when those fields change.

> **Visibility rule** — Only accounts with `ACTIVE` or `INACTIVE` status can be updated. Attempting to update an account with `INITIALIZING` or `TO_DELETED` status will return `404 Not Found`.

- **Method:** `PATCH`
- **URL:** `/admin/account/user/:userId`
- **Status:** `200 OK`

### Request Body

All fields are optional.

| Field          | Type   | Notes |
|----------------|--------|-------|
| `full_name`    | string | Min `1`, max `150` chars |
| `email`        | string | Valid email, max `150` chars, unique when provided |
| `phone_number` | string | Valid phone number, max `30` chars, unique when provided |
| `status`       | enum   | `ACTIVE`, `INACTIVE` |

### Example Request

```json
PATCH /admin/account/user/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
{
  "full_name": "Updated User Name",
  "status": "INACTIVE"
}
```

### Response `200 OK`

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "full_name": "Updated User Name",
  "email": "john.user@example.com",
  "phone_number": "+6281234567890",
  "role": "USER",
  "status": "INACTIVE",
  "auth_field_updated_at": "2026-05-04T02:30:00.000Z",
  "created_at": "2026-05-01T08:00:00.000Z",
  "updated_at": "2026-05-04T03:15:00.000Z"
}
```

---

## 4. Change User Password

Change the user password, rotate JWT auth timestamps, and send the new password to the user's WhatsApp number.

- **Method:** `PATCH`
- **URL:** `/admin/account/user/:userId/password`
- **Status:** `200 OK`

### Request Body

| Field      | Type   | Required | Notes |
|------------|--------|----------|-------|
| `password` | string | yes      | Min `8`, max `128` chars |

### Example Request

```json
PATCH /admin/account/user/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/password
{
  "password": "NewStrongPassword123"
}
```

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "auth_field_updated_at": "2026-05-04T03:00:00.000Z"
}
```

---

## 5. Delete User Account

Soft-delete a user account and mark its status as `TO_DELETED`.

- **Method:** `DELETE`
- **URL:** `/admin/account/user/:userId`
- **Status:** `200 OK`

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

## 6. User Creation Note

User creation is intentionally excluded from this module. New user accounts must be created through the signup flow.
