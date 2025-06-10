# BookWorm Backend API

Backend API for the BookWorm application - a social platform for book lovers to share and discover book recommendations.

## Features

- User authentication (register, login)
- Book management (create, read, update, delete)
- Search functionality
- Admin dashboard
- User management
- Image upload

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary for image storage

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Login user

### Books
- GET /books - Get all books (with pagination)
- POST /books - Create a new book
- GET /books/:id - Get a specific book
- PATCH /books/:id - Update a book
- DELETE /books/:id - Delete a book
- GET /books/search - Search books

### Admin
- GET /admin/users - Get all users
- PATCH /admin/users/:userId/toggle-ban - Toggle user ban status
- DELETE /admin/users/:userId - Delete a user
- GET /admin/books - Get all books
- DELETE /admin/books/:bookId - Delete a book

## License

MIT 