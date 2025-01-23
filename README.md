# My Blog Management System API

## Description

I've built this project as a RESTful API for a Blog Management System using Express.js and MongoDB. I designed it to support user authentication, role-based access control (Admin, Editor, User), and comprehensive blog and comment management. Users can sign up, log in, and interact with blog posts and comments based on their assigned roles. I'm really excited about how it allows for a structured and controlled blogging environment.

## Features

-   **User Management:**
    -   I implemented user registration with password hashing for security.
    -   User login is handled with JWT authentication, which I feel is a robust approach.
    -   (Bonus) I added email verification upon signup, sending a verification link to new users.
    -   (Bonus) I also made sure that only verified users can access private APIs.

-   **Role-Based Access Control:**
    -   **Admin:**
        -   Admins can create, edit, and delete blog posts.
        -   (Bonus) I enabled admins to assign blog posts to editors, which adds a nice layer of workflow management.
    -   **Editor:**
        -   (Bonus) Editors can edit blog posts assigned to them by an admin, but they can't touch other posts.
    -   **User:**
        -   Users can view blog posts.
        -   They can add comments to blog posts.
        -   I made sure users can delete their own comments, giving them some control.

-   **Blog Management:**
    -   I created endpoints for creating, reading, updating, and deleting blog posts, with access controlled by user roles.
    -   Each blog post must have a title and content.

-   **Comment Management:**
    -   Users can add comments to blog posts.
    -   Users can delete their own comments.

## Technologies Used

-   **Node.js:** I used Node.js as the runtime environment because of its efficiency and the vast ecosystem of npm packages.
-   **Express.js:** I chose Express.js as the web framework because it's flexible and easy to work with.
-   **MongoDB:** I went with MongoDB as the database because its document-based structure is a good fit for this kind of application.
-   **Mongoose:** Mongoose makes it easier to interact with MongoDB, so I used it for data modeling.
-   **jsonwebtoken:** I implemented JWT for generating and verifying tokens, ensuring secure authentication.
-   **bcrypt:** For password hashing, I used bcrypt, a well-regarded library for this purpose.
-   **nodemailer:** (Bonus) I used nodemailer to send emails, which was crucial for the email verification feature.
-   **dotenv:** I used dotenv to manage environment variables, keeping sensitive information separate from the code.

## Project Setup

### Prerequisites

-   Node.js (I recommend the LTS version)
-   npm (Node Package Manager)
-   MongoDB (You can install it locally or use a cloud-based instance like MongoDB Atlas)

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Configuration

1. **Create a `.env` file:**
    I created a `.env` file in the root of the project to store environment variables.
2. **Add environment variables:**
    Here's what I added to the `.env` file. You'll need to replace the placeholders with your own values:

    ```
    DATABASE_URL=<your-mongodb-connection-string>
    JWT_SECRET=<your-jwt-secret-key>
    PORT=5000

    # Bonus: Email Verification
    EMAIL_HOST=<your-email-host> # e.g., smtp.gmail.com
    EMAIL_PORT=<your-email-port> # e.g., 587
    EMAIL_USER=<your-email-address>
    EMAIL_PASS=<your-email-password>
    ```

## Running the Application

To start the application in development mode, I run:

```bash
npm run dev
Use code with caution.
Markdown
This uses nodemon to automatically restart the server whenever I make changes to the code.

To start the application in production mode, run:

npm start
Use code with caution.
Bash
The API will then be accessible at http://localhost:<PORT> (default is http://localhost:5000).

API Documentation
Base URL
<your-deployed-url>
Use code with caution.
Authentication
1. User Signup
Endpoint: /api/auth/signup

Method: POST

Request Body:

{
    "username": "johndoe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "role": "user" // Optional: Default is 'user'. Can be 'admin' or 'editor' if you have an admin seeding mechanism.
}
Use code with caution.
Json
Response (Success - 201 Created):

{
    "message": "User created successfully. Please check your email to verify your account.",
    "userId": "user_id"
}
Use code with caution.
Json
Response (Success - 200 OK) if no email verification:

{
        "message": "User registered successfully",
        "data": {
            "userId": "someUserId"
        }
    }
Use code with caution.
Json
Response (Error - 400 Bad Request):

{
    "error": "Error message (e.g., 'User already exists', 'Invalid email format')"
}
Use code with caution.
Json
Response (Error - 500 Internal Server Error):

{
    "error": "Internal server error"
}
Use code with caution.
Json
2. User Login
Endpoint: /api/auth/login

Method: POST

Request Body:

{
    "email": "john.doe@example.com",
    "password": "securepassword"
}
Use code with caution.
Json
Response (Success - 200 OK):

{
    "message": "Login successful",
    "token": "your_jwt_token",
    "user": {
        "id": "user_id",
        "username": "johndoe",
        "email": "john.doe@example.com",
        "role": "user",
        "isVerified": true // or false (Bonus)
    }
}
Use code with caution.
Json
Response (Error - 401 Unauthorized):

{
    "error": "Invalid credentials"
}
Use code with caution.
Json
Response (Error - 400 Bad Request):

{
    "error": "User not found"
}
Use code with caution.
Json
Response (Error - 500 Internal Server Error):

{
    "error": "Internal server error"
}
Use code with caution.
Json
3. Verify Email (Bonus)
Endpoint: /api/auth/verify-email/:token

Method: GET

Response (Success - 200 OK):

{
    "message": "Email verified successfully."
}
Use code with caution.
Json
Response (Error - 400 Bad Request):

{
    "error": "Invalid or expired token."
}
Use code with caution.
Json
Blog Management
Note: These routes require authentication. You need to include the JWT token in the Authorization header like this: Bearer <token>.

1. Create Blog Post (Admin Only)
Endpoint: /api/blogs

Method: POST

Request Body:

{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post."
}
Use code with caution.
Json
Response (Success - 201 Created):

{
    "message": "Blog post created successfully",
    "blog": {
        "id": "blog_id",
        "title": "My First Blog Post",
        "content": "This is the content of my first blog post.",
        "author": "user_id",
        "createdAt": "date_time",
        "updatedAt": "date_time"
    }
}
Use code with caution.
Json
Response (Error - 403 Forbidden):

{
    "error": "Forbidden"
}
Use code with caution.
Json
Response (Error - 400 Bad Request):

{
    "error": "Invalid request body or missing fields"
}
Use code with caution.
Json
2. Get All Blog Posts
Endpoint: /api/blogs

Method: GET

Response (Success - 200 OK):

{
    "blogs": [
        {
            "id": "blog_id_1",
            "title": "My First Blog Post",
            "content": "This is the content of my first blog post.",
            "author": "user_id_1",
            "createdAt": "date_time",
            "updatedAt": "date_time"
        },
        {
            "id": "blog_id_2",
            "title": "Another Blog Post",
            "content": "Content of another post.",
            "author": "user_id_2",
            "createdAt": "date_time",
            "updatedAt": "date_time"
        }
        // ... more blog posts
    ]
}
Use code with caution.
Json
3. Get Blog Post by ID
Endpoint: /api/blogs/:blogId

Method: GET

Response (Success - 200 OK):

{
    "blog": {
        "id": "blog_id",
        "title": "My First Blog Post",
        "content": "This is the content of my first blog post.",
        "author": "user_id",
        "createdAt": "date_time",
        "updatedAt": "date_time"
    }
}
Use code with caution.
Json
Response (Error - 404 Not Found):

{
    "error": "Blog post not found"
}
Use code with caution.
Json
4. Update Blog Post (Admin, or Editor for assigned blogs - Bonus)
Endpoint: /api/blogs/:blogId

Method: PUT

Request Body:

{
    "title": "Updated Blog Post Title",
    "content": "Updated content of the blog post."
}
Use code with caution.
Json
Response (Success - 200 OK):

{
    "message": "Blog post updated successfully",
    "blog": {
        "id": "blog_id",
        "title": "Updated Blog Post Title",
        "content": "Updated content of the blog post.",
        "author": "user_id",
        "createdAt": "date_time",
        "updatedAt": "date_time"
    }
}
Use code with caution.
Json
Response (Error - 403 Forbidden):

{
    "error": "Forbidden"
}
Use code with caution.
Json
Response (Error - 404 Not Found):

{
    "error": "Blog post not found"
}
Use code with caution.
Json
5. Delete Blog Post (Admin Only)
Endpoint: /api/blogs/:blogId

Method: DELETE

Response (Success - 200 OK):

{
    "message": "Blog post deleted successfully"
}
Use code with caution.
Json
Response (Error - 403 Forbidden):

{
    "error": "Forbidden"
}
Use code with caution.
Json
Response (Error - 404 Not Found):

{
    "error": "Blog post not found"
}
Use code with caution.
Json
6. Assign Blog to Editor (Bonus - Admin Only)
Endpoint: /api/blogs/:blogId/assign

Method: POST

Request Body:

{
    "editorId": "editor_user_id"
}
Use code with caution.
Json
Response (Success - 200 OK):

{
    "message": "Blog post assigned to editor successfully",
    "blog": {
        "id": "blog_id",
        "title": "Blog Post Title",
        "content": "Blog Post Content",
        "author": "user_id",
        "editor": "editor_user_id", // Field indicating the assigned editor
        "createdAt": "date_time",
        "updatedAt": "date_time"
    }
}
Use code with caution.
Json
Response (Error - 400 Bad Request):

{
    "error": "Blog already assigned to an editor"
}
Use code with caution.
Json
Comment Management
1. Add Comment to Blog Post
Endpoint: /api/blogs/:blogId/comments

Method: POST

Request Body:

{
    "content": "This is a great post!"
}
Use code with caution.
Json
Response (Success - 201 Created):

{
    "message": "Comment added successfully",
    "comment": {
        "id": "comment_id",
        "content": "This is a great post!",
        "blog": "blog_id",
        "author": "user_id",
        "createdAt": "date_time"
    }
}
Use code with caution.
Json
2. Delete Comment (User's Own Comment Only)
Endpoint: /api/comments/:commentId

Method: DELETE

Response (Success - 200 OK):

{
    "message": "Comment deleted successfully"
}
Use code with caution.
Json
Response (Error - 403 Forbidden):

{
    "error": "You can only delete your own comments"
}
Use code with caution.
Json
Response (Error - 404 Not Found):

{
    "error": "Comment not found"
}
Use code with caution.
Json
Deployment
I've made this application deployable to cloud platforms like Heroku, Render, or Vercel. Here are the general steps I follow for deployment:

Choose a platform: I usually sign up or log in to my preferred platform (Heroku, Render, or Vercel).

Prepare for deployment:

I make sure the application is production-ready. I set the NODE_ENV environment variable to production.

I ensure that the .env file is properly configured on the platform (usually through the platform's dashboard).

Deploy:

Heroku: I either use the Heroku CLI or connect my GitHub repository through the Heroku dashboard.

Render: I connect my GitHub repository and configure the build and start commands on Render.

Vercel: I connect my GitHub repository, and Vercel usually auto-detects the project settings, which is quite convenient.

Test: After deployment, I thoroughly test the live API endpoints to make sure everything is running smoothly.

Testing
For testing the API locally, I use tools like Postman or Insomnia. Here's my process:

Import the Postman collection (Optional): If I've created a Postman collection, I import it into Postman.

Set the base URL: I set the base URL to my local or deployed API's URL.

Test each endpoint: I send requests to each endpoint, following the API documentation I provided above.

Include the JWT token: For authenticated routes, I include the JWT token in the Authorization header as Bearer <token>.

Example using Postman:

I select the request method (e.g., POST, GET, PUT, DELETE).

I enter the endpoint URL (e.g., http://localhost:5000/api/blogs).

I add the request body (if needed) in the "Body" tab (I select "raw" and "JSON").

I add the Authorization header with the value Bearer <your_token> for authenticated routes.

I click "Send" to test the endpoint.

