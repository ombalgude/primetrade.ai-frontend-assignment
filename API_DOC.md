# 📄 **API Documentation**

Base URL (development):

```
http://localhost:5000
```

This API powers the Primetrade Assignment full-stack application.
It includes **JWT authentication**, **Profile APIs**, and **Task CRUD APIs**.
All protected routes require:

```
Authorization: Bearer <token>
```

---

# 🟦 **Authentication APIs**

## **POST /api/auth/register**

Register a new user.

**Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

## **POST /api/auth/login**

Authenticate a user and receive a JWT.

**Body**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200)**

```json
{
  "token": "<jwt-token>",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

# 🟩 **User APIs (Protected)**

## **GET /api/user/profile**

Returns authenticated user's profile.

**Headers**

```
Authorization: Bearer <token>
```

**Response (200)**

```json
{
  "id": "...",
  "email": "john@example.com",
  "name": "John Doe"
}
```

---

## **PUT /api/user/profile**

Update user profile.

**Headers**

```
Authorization: Bearer <token>
```

**Body**

```json
{
  "name": "New Name"
}
```

**Response (200)**

```json
{
  "id": "...",
  "email": "john@example.com",
  "name": "New Name"
}
```

---

# 🟧 **Task APIs (Protected)**

All task items are scoped to the authenticated user.

---

## **GET /api/tasks**

Retrieve tasks with pagination & filtering.

**Example:**

```
GET /api/tasks?page=1&limit=10
```

**Response (200)**

```json
{
  "data": [
    {
      "id": "uuid",
      "title": "First Task",
      "description": "Task description",
      "status": "PENDING",
      "priority": "MEDIUM"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 12 }
}
```

---

## **POST /api/tasks**

Create a new task.

**Body**

```json
{
  "title": "New task",
  "description": "details...",
  "status": "PENDING",
  "priority": "HIGH"
}
```

**Response (201)**

```json
{
  "task": {
    "id": "uuid",
    "title": "New task",
    "status": "PENDING",
    "priority": "HIGH"
  }
}
```

---

## **PUT /api/tasks/:id**

Update an existing task (partial updates allowed).

**Body**

```json
{
  "status": "COMPLETED"
}
```

**Response (200)**

```json
{
  "task": {
    "id": "uuid",
    "status": "COMPLETED"
  }
}
```

---

## **DELETE /api/tasks/:id**

Delete a task.

**Response (200)**

```json
{ "success": true }
```

---

# 🛡️ **Error Responses**

### **401 Unauthorized**

```
Authorization header missing
```

or

```
Invalid or expired token
```

### **404 Not Found**

Returned when:

* Task does not exist
* Task belongs to a different user

### **400 Bad Request**

Triggered by validation errors (Zod).

---

