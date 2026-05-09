# Admin Analytic API Documentation

Base URL: `/admin/analytic`

> **Auth required** — All endpoints require a valid `ADMIN` role access token.
> Add the header: `Authorization: Bearer <access_token>`

---

## 1. Skin Care Category Summary

Return total default skin care records by category for the rolling windows `last_30_days`, `last_7_days`, and `last_24_hours`.

- **Method:** `GET`
- **URL:** `/admin/analytic/skin-care/category-summary`
- **Auth:** `AdminGuard` (ADMIN role)

### Cache Behavior

- Response is cached through the global cache manager for `30 minutes`.
- While the cache entry is valid, repeated requests reuse the cached payload instead of querying PostgreSQL again.

### Response `200 OK`

```json
{
  "data": {
    "categories": [
      {
        "category": "routine",
        "last_30_days": 12,
        "last_7_days": 4,
        "last_24_hours": 1
      },
      {
        "category": "make_up",
        "last_30_days": 6,
        "last_7_days": 2,
        "last_24_hours": 0
      }
    ],
    "totals": {
      "last_30_days": 18,
      "last_7_days": 6,
      "last_24_hours": 1
    }
  },
  "meta": {
    "generated_at": "2026-05-09T10:00:00.000Z",
    "cache_ttl_minutes": 30
  }
}
```
