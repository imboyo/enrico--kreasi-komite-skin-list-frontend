# Auth API Documentation

Base URL: `/auth`

---

## 1. Login (Direct)

Login with email or phone number and password. Returns tokens directly without OTP verification.

- **Method:** `POST`
- **URL:** `/auth/login`
- **Throttle:** 5 req/10s · 10 req/60s · 50 req/1h (per IP)

### Request Body

Use either `email` or `phone_number` (at least one must be provided).

**With email:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**With phone number:**
```json
{
  "phone_number": "+6281234567890",
  "password": "password123"
}
```

**With both (optional):**
```json
{
  "email": "user@example.com",
  "phone_number": "+6281234567890",
  "password": "password123"
}
```

| Field          | Type   | Required | Validation Rules                            |
|----------------|--------|----------|---------------------------------------------|
| `email`        | string | optional | `@IsEmail`, `@MaxLength(150)`               |
| `phone_number` | string | optional | `@IsPhoneNumber`, `@MaxLength(30)`          |
| `password`     | string | required | `@IsString`, `@MinLength(8)`, `@MaxLength(128)` |

### Response `200 OK`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. Login Chain

Initiate login by validating credentials. On success, an OTP is sent to the user's phone/email for verification.

- **Method:** `POST`
- **URL:** `/auth/login-chain`
- **Throttle:** 5 req/10s · 10 req/60s · 50 req/1h (per IP)

### Request Body

Use either `email` or `phone_number` (at least one must be provided).

**With email:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**With phone number:**
```json
{
  "phone_number": "+6281234567890",
  "password": "password123"
}
```

**With both (optional):**
```json
{
  "email": "user@example.com",
  "phone_number": "+6281234567890",
  "password": "password123"
}
```

| Field          | Type   | Required | Validation Rules                            |
|----------------|--------|----------|---------------------------------------------|
| `email`        | string | optional | `@IsEmail`, `@MaxLength(150)`               |
| `phone_number` | string | optional | `@IsPhoneNumber`, `@MaxLength(30)`          |
| `password`     | string | required | `@IsString`, `@MinLength(8)`, `@MaxLength(128)` |

### Response `200 OK`

```json
{
  "message": "OTP sent"
}
```

---

## 3. Login Verify

Verify the OTP received after `login-chain`. Returns access and refresh tokens on success.

- **Method:** `POST`
- **URL:** `/auth/login-verify`
- **Throttle:** 5 req/10s · 10 req/60s · 50 req/1h (per IP)

### Request Body

Use either `email` or `phone_number` — must match what was used in `login-chain`.

**With email:**
```json
{
  "email": "user@example.com",
  "otp_code": "123456"
}
```

**With phone number:**
```json
{
  "phone_number": "+6281234567890",
  "otp_code": "123456"
}
```

**With both (optional):**
```json
{
  "email": "user@example.com",
  "phone_number": "+6281234567890",
  "otp_code": "123456"
}
```

| Field          | Type   | Required | Validation Rules                            |
|----------------|--------|----------|---------------------------------------------|
| `email`        | string | optional | `@IsEmail`, `@MaxLength(150)`               |
| `phone_number` | string | optional | `@IsPhoneNumber`, `@MaxLength(30)`          |
| `otp_code`     | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(10)` |

### Response `200 OK`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 4. Refresh Token

Exchange a refresh token for a new access token.

- **Method:** `POST`
- **URL:** `/auth/refresh-token`

### Request Body

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

| Field           | Type   | Required | Validation Rules               |
|-----------------|--------|----------|--------------------------------|
| `refresh_token` | string | required | `@IsString`, `@IsNotEmpty`     |

### Response `200 OK`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 5. Forgot Password Chain

Initiate a password reset. Use either `email` or `phone_number`. If email is provided, the OTP is sent to the user's email. If phone number is provided, the OTP is sent via WhatsApp.

- **Method:** `POST`
- **URL:** `/auth/forgot-password-chain`
- **Throttle:** 5 req/10s · 10 req/60s · 50 req/1h (per IP)

### Request Body

**With email:**
```json
{
  "email": "user@example.com"
}
```

**With phone number:**
```json
{
  "phone_number": "+6281234567890"
}
```

| Field          | Type   | Required | Validation Rules                   |
|----------------|--------|----------|------------------------------------|
| `email`        | string | optional | `@IsEmail`, `@MaxLength(150)`      |
| `phone_number` | string | optional | `@IsPhoneNumber`, `@MaxLength(30)` |

### Response `200 OK`

```json
{
  "message": "OTP sent to email"
}
```

or

```json
{
  "message": "OTP sent to WhatsApp"
}
```

---

## 6. Forgot Password Verify

Verify the OTP from `forgot-password-chain`. On success, the API returns a short-lived `reset_token` for setting the new password.

- **Method:** `POST`
- **URL:** `/auth/forgot-password-verify`
- **Throttle:** 5 req/10s · 10 req/60s · 50 req/1h (per IP)

### Request Body

Use the same identifier used in `forgot-password-chain`.

**With email:**
```json
{
  "email": "user@example.com",
  "otp_code": "123456"
}
```

**With phone number:**
```json
{
  "phone_number": "+6281234567890",
  "otp_code": "123456"
}
```

| Field          | Type   | Required | Validation Rules                             |
|----------------|--------|----------|----------------------------------------------|
| `email`        | string | optional | `@IsEmail`, `@MaxLength(150)`                |
| `phone_number` | string | optional | `@IsPhoneNumber`, `@MaxLength(30)`           |
| `otp_code`     | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(10)` |

### Response `200 OK`

```json
{
  "reset_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 7. Forgot Password Reset

Set a new password using the `reset_token` returned by `forgot-password-verify`.

- **Method:** `POST`
- **URL:** `/auth/forgot-password-reset`
- **Throttle:** 5 req/10s · 10 req/60s · 50 req/1h (per IP)

### Request Body

```json
{
  "reset_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "new_password": "newpassword123"
}
```

| Field          | Type   | Required | Validation Rules                                |
|----------------|--------|----------|-------------------------------------------------|
| `reset_token`  | string | required | `@IsString`, `@IsNotEmpty`                      |
| `new_password` | string | required | `@IsString`, `@MinLength(8)`, `@MaxLength(128)` |

### Response `200 OK`

```json
{
  "success": true,
  "uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

---

## 8. Add Admin Account

Create a new admin account. Requires the super admin key.

- **Method:** `POST`
- **URL:** `/auth/add-admin-account`
- **Status:** `201 Created`

### Request Body

**Minimal (without email):**
```json
{
  "super_admin_key": "super-secret-key",
  "full_name": "John Admin",
  "phone_number": "+6281234567890",
  "password": "adminpassword123"
}
```

**Full (with optional email):**
```json
{
  "super_admin_key": "super-secret-key",
  "full_name": "John Admin",
  "email": "admin@example.com",
  "phone_number": "+6281234567890",
  "password": "adminpassword123"
}
```

| Field             | Type   | Required | Validation Rules                                |
|-------------------|--------|----------|-------------------------------------------------|
| `super_admin_key` | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(128)`   |
| `full_name`       | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(150)`   |
| `email`           | string | optional | `@IsEmail`, `@MaxLength(150)`                   |
| `phone_number`    | string | required | `@IsPhoneNumber`, `@MaxLength(30)`              |
| `password`        | string | required | `@IsString`, `@MinLength(8)`, `@MaxLength(128)` |

### Response `201 Created`

```json
{
  "message": "Admin account created"
}
```

---

## 9. Register Direct

Register a new user account directly without OTP verification. Returns tokens immediately. Rejects if the phone number is already registered.

- **Method:** `POST`
- **URL:** `/auth/register-direct`
- **Status:** `201 Created`
- **Throttle:** 5 req/10s · 10 req/60s · 30 req/1h (per IP)

### Request Body

```json
{
  "full_name": "Jane Doe",
  "phone_number": "+6281234567890",
  "password": "mypassword123"
}
```

| Field          | Type   | Required | Validation Rules                                |
|----------------|--------|----------|-------------------------------------------------|
| `full_name`    | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(150)`   |
| `phone_number` | string | required | `@IsPhoneNumber`, `@MaxLength(30)`              |
| `password`     | string | required | `@IsString`, `@MinLength(8)`, `@MaxLength(128)` |

### Response `201 Created`

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 10. Register

Register a new user account. An OTP will be sent to the provided phone number for verification.

- **Method:** `POST`
- **URL:** `/auth/register`
- **Status:** `201 Created`
- **Throttle:** 5 req/10s · 10 req/60s · 30 req/1h (per IP)

### Request Body

```json
{
  "full_name": "Jane Doe",
  "phone_number": "+6281234567890",
  "password": "mypassword123"
}
```

| Field          | Type   | Required | Validation Rules                                |
|----------------|--------|----------|-------------------------------------------------|
| `full_name`    | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(150)`   |
| `phone_number` | string | required | `@IsPhoneNumber`, `@MaxLength(30)`              |
| `password`     | string | required | `@IsString`, `@MinLength(8)`, `@MaxLength(128)` |

### Response `201 Created`

```json
{
  "message": "OTP sent for verification"
}
```

---

## 11. Register Verify

Verify the OTP sent during registration to activate the account.

- **Method:** `POST`
- **URL:** `/auth/register-verify`
- **Throttle:** 5 req/10s · 10 req/60s · 30 req/1h (per IP)

### Request Body

```json
{
  "phone_number": "+6281234567890",
  "otp_code": "654321"
}
```

| Field          | Type   | Required | Validation Rules                             |
|----------------|--------|----------|----------------------------------------------|
| `phone_number` | string | required | `@IsPhoneNumber`, `@MaxLength(30)`           |
| `otp_code`     | string | required | `@IsString`, `@IsNotEmpty`, `@MaxLength(10)` |

### Response `200 OK`

```json
{
  "message": "Account verified successfully"
}
```
