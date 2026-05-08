# Skin Chat API Documentation

Base URL: `/user/skin-chat`

> **Auth required** — All endpoints require a valid `USER` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. Get Messages

Retrieve paginated chat history for the authenticated user, ordered newest-first.
Supports two mutually exclusive cursor modes:
- **`before`** — load older messages (backward pagination). Pass `next_cursor` from a previous response.
- **`after`** — load newer messages (forward polling). Pass the `created_at` of the newest currently displayed message to fetch only new ones.

> **Constraint:** `before` and `after` cannot be sent together. Sending both returns `400 Bad Request`.

- **Method:** `POST`
- **URL:** `/user/skin-chat/messages`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Request Body

All fields are optional.

| Field    | Type   | Required | Validation Rules                                                        |
|----------|--------|----------|-------------------------------------------------------------------------|
| `before` | string | optional | `@IsOptional`, `@IsISO8601` — cursor for older messages. Mutually exclusive with `after` |
| `after`  | string | optional | `@IsOptional`, `@IsISO8601` — cursor for newer messages (polling). Mutually exclusive with `before` |
| `limit`  | number | optional | `@IsOptional`, `@IsInt`, `@Min(1)` — max capped at 25                  |

### Example Requests

**Initial load (no cursor):**
```json
POST /user/skin-chat/messages
{}
```

**Load older messages (backward pagination):**
```json
POST /user/skin-chat/messages
{
  "before": "2024-01-01T12:00:00.000Z",
  "limit": 10
}
```

**Poll for new messages (forward, use `created_at` of newest displayed message):**
```json
POST /user/skin-chat/messages
{
  "after": "2024-01-01T12:05:00.000Z"
}
```

### Response `200 OK`

Response is always ordered **newest-first**, regardless of cursor direction.

```json
{
  "data": [
    {
      "uuid": "abc-123",
      "message": "Hello, what products do you recommend?",
      "sender_role": "user",
      "created_at": "2024-01-01T12:05:00.000Z"
    },
    {
      "uuid": "abc-122",
      "message": "Welcome! How can I help you today?",
      "sender_role": "admin",
      "created_at": "2024-01-01T12:00:00.000Z"
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

**When there are more older pages** (`has_more: true`), pass `next_cursor` as `before` in the next request:

```json
{
  "data": [...],
  "meta": {
    "limit": 25,
    "has_more": true,
    "next_cursor": "2024-01-01T11:00:00.000Z",
    "last_cleared_at": null
  }
}
```

> Note: `has_more` and `next_cursor` are only meaningful for `before`-based pagination. For `after` (polling), `has_more: true` means there are even more new messages beyond the current page.

### Detecting deleted conversations (staleness check)

`meta.last_cleared_at` is an ISO timestamp of the most recent time all messages were deleted for this thread, or `null` if the thread has never been cleared.

**Frontend polling logic:**
- On each poll response, compare `meta.last_cleared_at` against the `after` cursor you sent.
- If `last_cleared_at` is non-null and `last_cleared_at > after_cursor`, the conversation was cleared after your last known message — reset the displayed messages to the current `data` payload.

```
if (meta.last_cleared_at && new Date(meta.last_cleared_at) > new Date(afterCursor)) {
  // Conversation was cleared — replace all displayed messages with data
}
```

---

## 2. Send Message

Send a new chat message from the authenticated user. Creates a thread automatically on the first message.

- **Method:** `POST`
- **URL:** `/user/skin-chat`
- **Status:** `201 Created`
- **Auth:** `UserGuard` (USER role)

### Request Body

```json
{
  "message": "Hello, I have a question about my skin care routine."
}
```

| Field     | Type   | Required | Validation Rules                               |
|-----------|--------|----------|------------------------------------------------|
| `message` | string | required | `@IsString`, `@MinLength(1)`, `@MaxLength(5000)` |

### Response `201 Created`

```json
{
  "thread_id": 1,
  "message_id": 42,
  "message": "Hello, I have a question about my skin care routine.",
  "created_at": "2024-01-01T12:05:00.000Z"
}
```

---

## 3. Clean Messages

Delete all chat messages for the authenticated user's thread.

- **Method:** `DELETE`
- **URL:** `/user/skin-chat/clean`
- **Status:** `200 OK`
- **Auth:** `UserGuard` (USER role)

### Request Body

None.

### Response `200 OK`

**When the thread exists:**
```json
{
  "thread_id": 1,
  "deleted_count": 10
}
```

**When no thread exists (no messages ever sent):**
```json
{
  "thread_id": null,
  "deleted_count": 0
}
```
