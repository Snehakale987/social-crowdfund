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

## Get User Donations (Protected)

**Endpoint:** `GET /api/causes/my-donations`

**Description:**  
Retrieve a list of all donations made by the authenticated user.

**Authentication:** Required.  
You must include a valid JWT token in the `Authorization` header as `Bearer <token>`.

**Response:**

- **200 OK**  
  Returns an array of donation objects populated with basic cause details.
  ```json
  [
    {
      "_id": "donation_id",
      "name": "John Doe",
      "email": "john@example.com",
      "amount": 50,
      "anonymous": false,
      "cause": {
        "_id": "cause_id",
        "title": "Cause Title",
        "startDate": "2024-01-01T00:00:00Z",
        "endDate": "2024-12-31T00:00:00Z",
        "category": "category_name"
      },
      "date": "2024-10-10T00:00:00Z"
    }
  ]

## Get User's Created Causes (Protected)

**Endpoint:** `GET /api/causes/my-causes`

**Description:**  
Retrieves a list of all causes created by the authenticated user.

**Authentication:** Required.  
You must include a valid JWT token in the `Authorization` header as `Bearer <token>`.

**Response:**

- **200 OK**  
  Returns an array of cause objects.
  ```json
  [
    {
      "_id": "cause_id",
      "title": "User Created Cause",
      "category": "category_id",
      "description": "Description of the cause",
      "images": ["uploads/image1.jpg", "uploads/image2.jpg"],
      "updates": [
        { "text": "Initial update", "date": "2024-01-01T00:00:00Z" }
      ],
      "targetAmount": 5000,
      "fundsRaised": 2500,
      "progress": 50,
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-12-31T00:00:00Z",
      "creator": "user_id",
      "isTrending": false
    }
  ]

## Get Cause by ID

**Endpoint:** `GET /api/causes/:id`

**Description:**  
Fetch the details of a specific cause by its ID.

**URL Parameters:**
- `id`: The unique identifier of the cause.

**Authentication:** Not required.

**Response:**

- **200 OK**  
  Returns the cause object with populated category, creator, and donor details.
  ```json
  {
    "_id": "cause_id",
    "title": "Cause Title",
    "description": "Detailed description of the cause",
    "category": {
      "_id": "category_id",
      "name": "Category Name"
    },
    "creator": {
      "_id": "user_id",
      "name": "Creator Name",
      "email": "creator@example.com",
      "image": "creator_image.jpg"
    },
    "images": ["uploads/image1.jpg", "uploads/image2.jpg"],
    "updates": [
      { "text": "Update message", "date": "2024-01-01T00:00:00Z" }
    ],
    "targetAmount": 10000,
    "fundsRaised": 5000,
    "progress": 50,
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-12-31T00:00:00Z",
    "donors": [
      {
        "user": {
          "_id": "donor_user_id",
          "name": "Donor Name",
          "email": "donor@example.com",
          "image": "donor_image.jpg"
        },
        "amount": 100,
        "anonymous": false
      }
    ],
    "comments": [
      "comment_id_1",
      "comment_id_2"
    ]
  }
