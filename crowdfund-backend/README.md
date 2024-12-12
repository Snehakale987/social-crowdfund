# Schema Documentation

**All schemas are defined using the Mongoose model for querying and manipulating documents**

# Cause Schema

**Model:** `Cause`  
**Collection:** `causes`

The `Cause` schema defines the structure for storing information related to a philanthropic cause or campaign. Each cause includes details such as its title, financial goals, timeline, associated images, and relationships to other models like `Category`, `User`, and `Comment`.

## Fields

| Field Name    | Type                                     | Required | Description                                                                                                 |
|---------------|-------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------|
| title         | String                                   | Yes      | The title or name of the cause.                                                                              |
| progress      | Number                                   | Yes      | A numeric value representing the progress (in percentage) towards the fundraising goal.                      |
| targetAmount  | Number                                   | Yes      | The total amount the cause is attempting to raise.                                                           |
| fundsRaised   | Number                                   | Yes      | The amount of funds raised so far.                                                                           |
| startDate     | Date                                     | Yes      | The start date of the fundraising campaign.                                                                  |
| endDate       | Date                                     | Yes      | The end date of the fundraising campaign.                                                                    |
| images        | [String]                                 | Yes      | An array of image URLs or paths representing the cause.                                                      |
| description   | String                                   | Yes      | A detailed description of the cause.                                                                         |
| updates       | [Object]                                 | No       | An array of updates related to the cause. Each update has a `date` (String) and `text` (String).             |
| category      | ObjectId (ref: Category)                 | No       | A reference to a `Category` document that classifies the cause.                                               |
| isTrending    | Boolean                                  | No       | A flag indicating whether the cause is currently marked as trending. Default is `false`.                     |
| creator       | ObjectId (ref: User)                     | Yes      | A reference to the `User` who created the cause.                                                             |
| donors        | [Object]                                 | No       | An array of donor objects. Each donor object contains `user` (ref: User) and `amount` (Number).              |
| comments      | [ObjectId] (ref: Comment)                | No       | An array of `Comment` references associated with this cause.                                                 |

### Updates Array Example
```json
"updates": [
  {
    "date": "2024-01-10",
    "text": "Reached 50% of the fundraising goal!"
  },
  {
    "date": "2024-02-01",
    "text": "Project milestone: Completed initial survey."
  }
]
```

### Donors Array Example
```json
"donors": [
  {
    "user": "609e12ab1234567890abcdef", 
    "amount": 100
  },
  {
    "user": "609e12ab0987654321fedcba",
    "amount": 50
  }
]
```

## Virtual Fields

| Virtual Field | Type   | Description                                                                                                    |
|---------------|---------|----------------------------------------------------------------------------------------------------------------|
| daysLeft      | Number  | Calculates the number of days remaining until the end of the campaign. Returns `0` if the campaign has ended. |
| id            | String  | Provides a user-friendly identifier by returning the `_id` value as a string.                                |

**daysLeft Calculation:**
Computed as (endDate - startDate) / (1000 * 60 * 60 * 24).
If the result is negative, returns 0 to indicate the campaign has ended.


## Category Schema

**Model:** `Category`  
**Collection:** `categories`

The `Category` schema defines how categories are stored in the database. Each category has a name and an associated image.

### Fields

| Field Name | Type   | Required | Description                                               |
|------------|---------|----------|-----------------------------------------------------------|
| name       | String | Yes      | The name of the category (e.g., "Education", "Health").   |
| image      | String | Yes      | A URL or path to an image representing the category.      |

### Virtual Fields

| Virtual Field | Type   | Description                                             |
|---------------|---------|---------------------------------------------------------|
| id            | String | A virtual field that returns the category's `_id` value as a string. This field is included when converting the document to JSON. |

#### Example Document

```json
{
  "_id": "64e8d7f6ccf4a9181c8f1234",
  "name": "Health",
  "image": "uploads/health.jpg",
  "id": "64e8d7f6ccf4a9181c8f1234"
}
```

# Comment Schema

**Model:** `Comment`  
**Collection:** `comments`

The `Comment` schema defines the structure for storing user comments on causes. Each comment references the cause it belongs to and the user who made the comment.

## Fields

| Field Name | Type                         | Required | Description                                                    |
|------------|------------------------------|----------|----------------------------------------------------------------|
| cause      | ObjectId (ref: Cause)        | Yes      | A reference to the `Cause` that this comment is associated with. |
| user       | ObjectId (ref: User)         | Yes      | A reference to the `User` who created this comment.             |
| text       | String                       | Yes      | The text of the comment.                                       |
| date       | Date                         | No       | The date and time the comment was created. Defaults to current time. |

### Example
```json
{
  "_id": "6500ac2e2f26a90d93ab47f1",
  "cause": "64f0d7f6ccf4a9181c8f1234",
  "user": "64e8d7f6ccf4a9181c8f9012",
  "text": "This is a great cause!",
  "date": "2024-10-10T10:00:00Z"
}
```

## Virtual Fields

| Virtual Field | Type   | Description                                     |
|---------------|---------|-------------------------------------------------|
| id            | String | Returns the `_id` field as a hex string, providing a more readable identifier in JSON responses. |

## Notes
- The required fields ensure that every comment must have an associated cause, a user, and text.
- The date field defaults to the current time, capturing when the comment was created.
- By referencing `Cause` and `User` models, this schema allows for easy population of associated data when retrieving comments.

# Donor Schema

**Model:** `Donor`  
**Collection:** `donors`

The `Donor` schema defines the structure for storing information about donors who contribute funds to a cause.

## Fields

| Field Name | Type                           | Required | Description                                                                      |
|------------|--------------------------------|----------|----------------------------------------------------------------------------------|
| name       | String                         | Yes      | The donor's name.                                                                |
| email      | String                         | Yes      | The donor's email address.                                                       |
| amount     | Number                         | Yes      | The amount of money donated.                                                     |
| anonymous  | Boolean                        | No       | Indicates whether the donor chose to remain anonymous. Defaults to `false`.       |
| cause      | ObjectId (ref: Cause)          | Yes      | A reference to the `Cause` this donation is associated with.                     |
| date       | Date                           | No       | The date the donation was made. Defaults to the current date/time.               |

### Example Document

```json
{
  "_id": "6510bd3c0e3c930de12f4567",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "amount": 100,
  "anonymous": false,
  "cause": "6500ac2e2f26a90d93ab47f1",
  "date": "2024-10-11T09:30:00Z"
}
```
## Notes
- The required fields ensure that a donor must have a name, email, amount, and associated cause.
- The date field defaults to the current time, capturing when the donation was made.
- By referencing the `Cause` model, this schema allows for easy population of cause details when retrieving donor information.

# User Schema

**Model:** `User`  
**Collection:** `users`

The `User` schema defines the structure for storing user information such as name, email, password, and profile image.

## Fields

| Field Name | Type   | Required | Unique | Default               | Description                                                       |
|------------|---------|----------|--------|-----------------------|-------------------------------------------------------------------|
| name       | String | Yes      | No     | N/A                   | The user's full name.                                             |
| email      | String | Yes      | Yes    | N/A                   | The user's unique email address, used for identification and login. |
| password   | String | Yes      | No     | N/A                   | The user's hashed password.                                       |
| image      | String | No       | No     | "default-profile.png" | The URL or path to the user's profile image. Defaults to a placeholder image if none is provided. |

### Example Document

```json
{
  "_id": "6512ca4c0a3c930de12f4567",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "$2b$10$encodedpasswordexamplehere",
  "image": "uploads/profile-alice.jpg"
}
```

## Notes
- The required and unique constraints ensure data integrity.
- The email field being unique means no two users can have the same email.
- The image field defaults to a default-profile.png image if not provided.
- Passwords are expected to be hashed before being saved to the database.

# API Documentation

## Causes API Documentation

The following endpoints are part of the Causes API. All routes are prefixed with `/api/causes`.

### Authentication

Endpoints that require user authentication are protected by `authenticateUser`. You must provide a valid authentication token (e.g., via a header like `Authorization: Bearer <token>`) to access these protected routes.

---

### Get Trending Causes

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

### Get User Donations (Protected)

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

### Get User's Created Causes (Protected)

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

### Get Cause by ID

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

### Add a Comment to a Cause (Protected)

**Endpoint:** `POST /api/causes/:id/comments`

**Description:**
Add a new comment to a specific cause. Only authenticated users can comment.

**Authentication:** Required.

**URL Parameters:**

- `id`: The ID of the cause.

**Request Body:**
```json
{
  "text": "This is a comment"
}
```

**Response:**

- **200 OK**
```json
{
  "message": "Comment added successfully",
  "comment": {
    "_id": "comment_id",
    "cause": "cause_id",
    "user": "user_id",
    "text": "This is a comment",
    ...
  }
}
```

* `400 Bad Request` if text is missing.
* `404 Not Found` if the cause does not exist.
* `500 Internal Server Error` on failure.

### Get Comments for a Cause

**Endpoint:** `GET /api/causes/:id/comments`

**Description:**
Retrieve all comments for a given cause.

**URL Parameters:**

- `id`: The ID of the cause.

**Response:**

`200 OK` on success

```json
[
  {
    "_id": "comment_id",
    "cause": "cause_id",
    "user": {
      "_id": "user_id",
      "name": "Commenter",
      "email": "commenter@example.com"
    },
    "text": "This is a comment",
    "date": "2024-10-10T00:00:00Z"
  }
]
```

* `500 Internal Server Error` on failure.

### Get Donors for a Cause

**Endpoint:** `GET /api/causes/:id/donors`

**Description:** Retrieve a list of donors for a specified cause.

**URL Parameters:**

- `id`: The ID of the cause.

**Response:**

`200 OK` on success:
```json
[
  {
    "name": "John Doe",
    "amount": 100,
    "anonymous": false,
    "date": "2024-10-10T00:00:00Z"
  }
]
```

`500 Internal Server Error` on failure.

### Add a New Donor to a Cause (Protected)

**Endpoint:** `POST /api/causes/:id/donors`

**Description:**
Add a new donor entry for a cause. The currently authenticated user's name and email are recorded as the donor.

**Authentication:** Required.

**URL Parameters:**

 - `id`: The ID of the cause.

**Request Body:**

```json
{
  "amount": 50,
  "anonymous": false
}
```

**Response:**

`201 Created` on success:

```json
{
  "message": "Donation successful",
  "donor": {
    "_id": "donor_id",
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 50,
    "anonymous": false,
    "cause": "cause_id"
  }
}
```

- `400 Bad Request` if amount is missing or invalid.
- `500 Internal Server Error` on failure.

### Donate to a Cause (Protected)

**Endpoint:** `POST /api/causes/:id/donate`

**Description:**
Donate funds to a cause. Updates the cause's fundsRaised and progress based on the donation amount. Also records the donor in the Donor collection.

**Authentication:** Required.

**URL Parameters:**

- `id`: The ID of the cause.

**Request Body:**

```json
{
  "amount": 100,
  "anonymous": true
}
```

**Response:**

`200 OK` on success:

```json
{
  "message": "Donation successful",
  "fundsRaised": 1000,
  "progress": 50,
  "donor": {
    "_id": "donor_id",
    "name": "Anonymous",
    "email": "user@example.com",
    "amount": 100,
    "anonymous": true,
    "cause": "cause_id"
  }
}
```

- `404 Not Found` if the cause does not exist.
- `500 Internal Server Error` on failure.

### Create a New Cause (Protected)

**Endpoint:** `POST /api/causes/create`

**Description:**
Create a new cause with the authenticated user as the creator. Allows uploading of up to 5 images.

**Authentication:** Required.

**Form Data:**

- `title (string, required)`
- `category (string, must be a valid category ID)`
- `description (string, required)`
- `updates (stringified JSON array, optional)`
- `targetAmount (number, required)`
- `startDate (date string, required)`
- `endDate (date string, required)`
- `images (up to 5 image files, optional)`

**Example Request (multipart/form-data):**

```
Content-Type: multipart/form-data
Form Fields:
title: "New Cause"
category: "category_id"
description: "A description"
updates: "[{\"text\":\"Initial update\"}]"
targetAmount: 2000
startDate: 2024-01-01
endDate: 2024-12-31
(images) - uploaded files
```

**Response:**

`201 Created` on success:
```json
{
  "_id": "new_cause_id",
  "title": "New Cause",
  "category": {
    "_id": "category_id",
    "name": "Category Name"
  },
  "description": "A description",
  "images": ["uploads/image1.jpg", "uploads/image2.jpg"],
  "updates": [
    {
      "text": "Initial update"
    }
  ],
  "targetAmount": 2000,
  "fundsRaised": 0,
  "progress": 0,
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-12-31T00:00:00Z",
  "creator": "user_id"
}
```

- `400 Bad Request `if required fields are missing or if the category is invalid.

- `500 Internal Server Error` on failure.


## Categories API Documentation

The following endpoints are part of the Categories API. All routes are prefixed with `/api/categories`.

### Get All Categories

**Endpoint:** `GET /api/categories`

**Description:**  
Retrieve a list of all categories available in the system.

**Authentication:** Not required.

**Response:**
- **200 OK**  
  Returns an array of category objects.
  ```json
  [
    {
      "_id": "category_id",
      "name": "Category Name",
      "__v": 0
    }
  ]
  ```

- `500 Internal Server Error` if a server-side error occurs.

### Get Causes by Category ID

**Endpoint:** `GET /api/categories/:id`

**Description:**
Retrieve the name of a specific category and the list of causes associated with it.

**URL Parameters:**

- `id`: The unique identifier of the category.
Authentication: Not required.

**Response:**

`200 OK` : Returns the category name and the array of causes belonging to that category.

```json
{
  "categoryName": "Category Name",
  "causes": [
    {
      "_id": "cause_id",
      "title": "Cause Title",
      "category": "category_id",
      "description": "Cause description",
      "images": [...],
      "updates": [...],
      "targetAmount": 10000,
      "fundsRaised": 5000,
      "progress": 50,
      "startDate": "2024-01-01T00:00:00Z",
      "endDate": "2024-12-31T00:00:00Z",
      "creator": "user_id",
      ...
    }
  ]
}
```

- `404 Not Found` if the category with the given ID does not exist.
- `500 Internal Server Error` if a server-side error occurs.

# Authentication API Documentation

The following endpoints handle user authentication-related operations. All routes are prefixed with `/api/auth`.

### User Registration

**Endpoint:** `POST /api/auth/register`

**Description:**  
Create a new user account.  
The request must include a name, email, and password. An optional image can be provided; if none is provided, a default image is used.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword",
  "image": "profile-image.png"
}
```

```
- name (string, required): The user's full name.
- email (string, required): The user's unique email address.
- password (string, required): The user's password (will be hashed before storage).
- image (string, optional): URL or filename of the user's profile image.
```

**Response:**

- `201 Created` : User is successfully registered.

```json
{
  "id": "new_user_id",
  "message": "User registered successfully"
}
```

- `500 Internal Server Error` If there is a server-side issue during registration.

### User Login

**Endpoint:** `POST /api/auth/login`

**Description:**
Authenticate an existing user and receive a JWT token for protected routes.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword"
}
```

```
- email (string, required): The user's registered email address.
- password (string, required): The user's password.
```

**Response:**

`200 OK` : Successful authentication returns a JWT token and basic user details.

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "profile-image.png"
  }
}
```

- `404 Not Found` If the user with the given email does not exist.

```json
{
  "message": "User not found"
}
```

`401 Unauthorized` If the provided password is incorrect.

```json
{
  "message": "Invalid credentials"
}
```

`500 Internal Server Error` If there is a server-side issue during login.

```json
{
  "message": "Error logging in user"
}
```