# Admin Account Admin API Documentation

Base URL: `/admin/account/admin`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List Admin Accounts

Retrieve a paginated list of admin accounts. Supports the shared `ListQueryDto` contract for search, sort, and filter.

- **Method:** `POST`
- **URL:** `/admin/account/admin/list`
- **Status:** `200 OK`

### Request Body

All fields are optional.

| Field      | Type      | Description                                      |
|------------|-----------|--------------------------------------------------|
| `page`     | number    | Page number, min `1`. Default: `1`              |
| `limit`    | number    | Items per page, min `1`, max `100`. Default: `10` |
| `search`   | string    | ILIKE search across `full_name`, `email`, `phone_number` |
| `sort`     | SortDto[] | Sort order for allowed fields                    |
| `filter`   | FilterDto | Dynamic filter for allowed fields                |

### Allowed Sort / Filter Fields

`uuid`, `full_name`, `email`, `phone_number`, `role`, `status`, `auth_field_updated_at`, `created_at`, `updated_at`, `profile_photo.original_name`

### Allowed Relations

`profile_photo`

### Example Request

```json
POST /admin/account/admin/list
{
  "page": 1,
  "limit": 20,
  "search": "support",
  "sort": [{ "field": "created_at", "direction": "DESC" }]
}
```

### Response `200 OK`

```json
{
  "data": [
    {
      "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "full_name": "Support Admin",
      "email": "support@example.com",
      "phone_number": "+6281234567890",
      "role": "ADMIN",
      "status": "ACTIVE",
      "auth_field_updated_at": "2026-05-04T02:30:00.000Z",
      "created_at": "2026-05-01T08:00:00.000Z",
      "updated_at": "2026-05-04T02:30:00.000Z",
      "profile_photo": {
        "uuid": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
        "original_name": "avatar.png",
        "category": "profile-photos",
        "mime_type": "image/png",
        "size": "204800",
        "is_public": true,
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

## 2. Get Admin Detail

Retrieve a single admin account by ID, including the profile photo.

- **Method:** `GET`
- **URL:** `/admin/account/admin/:adminId`
- **Status:** `200 OK`

### Response `200 OK`

```json
{
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "full_name": "Support Admin",
  "email": "support@example.com",
  "phone_number": "+6281234567890",
  "role": "ADMIN",
  "status": "ACTIVE",
  "auth_field_updated_at": "2026-05-04T02:30:00.000Z",
  "created_at": "2026-05-01T08:00:00.000Z",
  "updated_at": "2026-05-04T02:30:00.000Z",
  "profile_photo": {
    "uuid": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
    "original_name": "avatar.png",
    "category": "profile-photos",
    "mime_type": "image/png",
    "size": "204800",
    "is_public": true,
    "created_at": "2026-05-01T08:00:00.000Z",
    "updated_at": "2026-05-01T08:00:00.000Z"
  }
}
```

---

## 3. Create Admin Account

Create a new admin account. Email and phone number are validated for uniqueness before insert.

- **Method:** `POST`
- **URL:** `/admin/account/admin`
- **Status:** `201 Created`

### Request Body

| Field          | Type   | Required | Notes |
|----------------|--------|----------|-------|
| `full_name`    | string | yes      | Max `150` chars |
| `email`        | string | no       | Must be a valid email, unique when provided |
| `phone_number` | string | yes      | Must be a valid phone number, unique |
| `password`     | string | yes      | Min `8`, max `128` chars |
| `status`       | enum   | no       | Defaults to `ACTIVE` |

### Example Request

```json
POST /admin/account/admin
{
  "full_name": "Operations Admin",
  "email": "ops@example.com",
  "phone_number": "+6281234567891",
  "password": "StrongPassword123",
  "status": "ACTIVE"
}
```

---

## 4. Update Admin Account

Update admin fields except the password. Unique email and phone number checks are applied when those fields change.

- **Method:** `PATCH`
- **URL:** `/admin/account/admin/:adminId`
- **Status:** `200 OK`

### Request Body

All fields are optional.

| Field          | Type   | Notes |
|----------------|--------|-------|
| `full_name`    | string | Max `150` chars |
| `email`        | string | Valid email, unique when provided |
| `phone_number` | string | Valid phone number, unique when provided |
| `status`       | enum   | `INITIALIZING`, `ACTIVE`, `INACTIVE`, `TO_DELETED` |

### Example Request

```json
PATCH /admin/account/admin/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
{
  "full_name": "Updated Admin Name",
  "status": "INACTIVE"
}
```

---

## 5. Change Admin Password

Change the admin password, rotate JWT auth timestamps, and send the new password to the admin's WhatsApp number.

- **Method:** `PATCH`
- **URL:** `/admin/account/admin/:adminId/password`
- **Status:** `200 OK`

### Request Body

| Field      | Type   | Required | Notes |
|------------|--------|----------|-------|
| `password` | string | yes      | Min `8`, max `128` chars |

### Example Request

```json
PATCH /admin/account/admin/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/password
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

## 6. Delete Admin Account

Soft-delete an admin account and mark its status as `TO_DELETED`.

- **Method:** `DELETE`
- **URL:** `/admin/account/admin/:adminId`
- **Status:** `200 OK`

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```
