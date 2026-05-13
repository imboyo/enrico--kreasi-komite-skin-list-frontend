# Admin Skin Chat API Documentation

Base URL: `/admin/skin-chat`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. List Threads

Retrieve a paginated list of all skin chat threads. Supports dynamic filtering, sorting, search, and relation population via the generic `ListQueryDto` contract.

- **Method:** `POST`
- **URL:** `/admin/skin-chat/thread-list`
- **Auth:** `AdminGuard` (ADMIN role)

The `user` relation is always joined automatically to support filter/search on user fields.

### Request Body

All fields are optional.

| Field      | Type      | Description                                           |
| ---------- | --------- | ----------------------------------------------------- |
| `page`     | number    | Page number, min 1. Default: `1`                      |
| `limit`    | number    | Items per page, min 1, max 100. Default: `10`         |
| `search`   | string    | Full-text ILIKE search across user name, email, phone |
| `populate` | string[]  | Relations to include. Allowed: `user`                 |
| `sort`     | SortDto[] | Sort order. See allowed sort fields below             |
| `filter`   | FilterDto | Dynamic filter. See allowed filter fields below       |

#### Allowed Sort Fields

| Field             | Notes                    |
| ----------------- | ------------------------ |
| `last_message_at` | Date of the last message |
| `created_at`      | Thread creation date     |
| `updated_at`      | Thread last update date  |
| `user.full_name`  | Owner's full name        |

#### Allowed Filter Fields

| Field               | Type      |
| ------------------- | --------- |
| `last_message_at`   | timestamp |
| `created_at`        | timestamp |
| `updated_at`        | timestamp |
| `user.full_name`    | string    |
| `user.email`        | string    |
| `user.phone_number` | string    |
| `user.role`         | enum      |
| `user.status`       | enum      |

#### Search Fields (ILIKE)

`user.full_name`, `user.email`, `user.phone_number`

---

### Example Requests

**Basic pagination:**

```json
POST /admin/skin-chat/thread-list
{
  "page": 1,
  "limit": 20
}
```

**Search by user name:**

```json
POST /admin/skin-chat/thread-list
{
  "search": "john"
}
```

**Sort by last message descending:**

```json
POST /admin/skin-chat/thread-list
{
  "sort": [{ "field": "last_message_at", "direction": "DESC" }]
}
```

**Filter threads with no messages (last_message_at is null):**

```json
POST /admin/skin-chat/thread-list
{
  "filter": {
    "and": [{ "field": "last_message_at", "operator": "isNull" }]
  }
}
```

**Filter by user role:**

```json
POST /admin/skin-chat/thread-list
{
  "filter": {
    "and": [{ "field": "user.role", "operator": "eq", "value": "USER" }]
  }
}
```

---

### Response `200 OK`

Each thread always includes a `messages` array (max 3, oldest-first). Empty when the thread has no messages.

```json
{
  "data": [
    {
      "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
      "last_message_at": "2024-01-01T12:05:00.000Z",
      "created_at": "2024-01-01T10:00:00.000Z",
      "updated_at": "2024-01-01T12:05:00.000Z",
      "user": {
        "id": "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
        "full_name": "John Doe",
        "email": "john@example.com",
        "phone_number": "+6281234567890",
        "role": "USER",
        "status": "ACTIVE"
      },
      "messages": [
        {
          "id": "mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm",
          "message": "Hello, I need help with my skin.",
          "created_at": "2024-01-01T12:00:00.000Z",
          "sender_role": "USER",
          "thread_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        }
      ]
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "total_pages": 5
  }
}
```

### Filter Operators

| Operator     | SQL           | Notes                                   |
| ------------ | ------------- | --------------------------------------- |
| `eq`         | `=`           |                                         |
| `neq`        | `!=`          |                                         |
| `gt`         | `>`           |                                         |
| `gte`        | `>=`          |                                         |
| `lt`         | `<`           |                                         |
| `lte`        | `<=`          |                                         |
| `like`       | `LIKE`        | Auto-wrapped with `%`                   |
| `ilike`      | `ILIKE`       | Auto-wrapped with `%`, case-insensitive |
| `in`         | `IN`          | `value` must be an array                |
| `notIn`      | `NOT IN`      | `value` must be an array                |
| `isNull`     | `IS NULL`     | No `value` needed                       |
| `isNotNull`  | `IS NOT NULL` | No `value` needed                       |
| `between`    | `BETWEEN`     | `value` must be `[min, max]`            |
| `notBetween` | `NOT BETWEEN` | `value` must be `[min, max]`            |

---

## 2. Get Thread Messages

Retrieve paginated message history for a specific user's thread, ordered newest-first.
Uses cursor-based pagination via `before` (ISO 8601 datetime of the oldest loaded message).

- **Method:** `POST`
- **URL:** `/admin/skin-chat/thread-messages/:userUuid`
- **Status:** `200 OK`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter  | Type   | Description              |
| ---------- | ------ | ------------------------ |
| `userUuid` | string | UUID of the user account |

### Request Body

All fields are optional.

| Field    | Type   | Required | Validation Rules                                       |
| -------- | ------ | -------- | ------------------------------------------------------ |
| `before` | string | optional | `@IsOptional`, `@IsISO8601` — ISO 8601 datetime cursor |
| `limit`  | number | optional | `@IsOptional`, `@IsInt`, `@Min(1)` — max capped at 25  |

### Example Requests

```json
POST /admin/skin-chat/thread-messages/yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy
{}
```

```json
POST /admin/skin-chat/thread-messages/yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy
{
  "limit": 10,
  "before": "2024-01-01T12:00:00.000Z"
}
```

### Response `200 OK`

```json
{
  "data": [
    {
      "id": "mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm",
      "message": "Hello, I need help with my skin.",
      "sender_role": "USER",
      "created_at": "2024-01-01T12:05:00.000Z"
    },
    {
      "id": "nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn",
      "message": "Thank you for reaching out! Here's our recommendation...",
      "sender_role": "ADMIN",
      "created_at": "2024-01-01T12:10:00.000Z"
    }
  ],
  "meta": {
    "limit": 25,
    "has_more": false,
    "next_cursor": null,
    "last_cleared_at": null
  }
}
```

**When there are more pages** (`has_more: true`), pass `next_cursor` as the `before` body field in the next request.

When the user has no chat thread yet, the endpoint still returns the same structure with an empty `data` array.

---

## 3. Clear Thread Conversation

Delete all messages in a specific user's thread and reset the thread's `last_message_at` to null.

- **Method:** `DELETE`
- **URL:** `/admin/skin-chat/thread-clean/:userUuid`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter  | Type   | Description              |
| ---------- | ------ | ------------------------ |
| `userUuid` | string | UUID of the user account |

### Response `200 OK`

```json
{
  "thread_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "deleted_count": 5
}
```

When the user has no chat thread yet, the endpoint returns:

```json
{
  "thread_id": null,
  "deleted_count": 0
}
```

---

## 4. Reply to Thread

Send a message as ADMIN to a specific user's thread. If the user does not have a chat thread yet, one is created before inserting the message.

- **Method:** `POST`
- **URL:** `/admin/skin-chat/thread-reply/:userUuid`
- **Auth:** `AdminGuard` (ADMIN role)

### Path Parameters

| Parameter  | Type   | Description              |
| ---------- | ------ | ------------------------ |
| `userUuid` | string | UUID of the user account |

### Request Body

| Field     | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| `message` | string | Yes      | Message text, 1–5000 characters |

### Example Request

```json
POST /admin/skin-chat/thread-reply/yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy
{
  "message": "Thank you for reaching out! Here's our recommendation..."
}
```

### Response `201 Created`

```json
{
  "thread_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "message_id": "mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm",
  "message": "Thank you for reaching out! Here's our recommendation...",
  "created_at": "2024-01-01T12:10:00.000Z"
}
```

### Error Responses

| Status | Description    |
| ------ | -------------- |
| `404`  | User not found |
