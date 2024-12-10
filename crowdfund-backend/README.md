# Causes API Documentation

The following endpoints are part of the Causes API. All routes are prefixed with `/api/causes`.

## Authentication

Endpoints that require user authentication are protected by `authenticateUser`. You must provide a valid authentication token (e.g., via a header like `Authorization: Bearer <token>`) to access these protected routes.

---

## Get Trending Causes

**Endpoint:** `GET /api/causes/trending`

**Description:**  
Fetch a paginated list of causes that are marked as trending.

**Query Parameters:**
- `page` (optional, integer): The page number. Defaults to `1`.
- `limit` (optional, integer): The number of causes per page. Defaults to `6`.

**Response:**
- `200 OK` on success:
  ```json
  {
    "page": 1,
    "totalPages": 3,
    "totalCauses": 18,
    "causes": [
       {
         "_id": "cause_id",
         "title": "Example Cause",
         "isTrending": true,
         ...
       }
     ]
  }
