# Authentication API 
 
This is a simple authentication API built with Express.js, MySQL, and JWT. It provides endpoints for user registration and login, including password hashing and token creation. 
 
## Features 
- User registration 
- User login 
- Password hashing using bcrypt 
- Token creation with JWT 
- MySQL database integration 
 
## Getting Started 
 
### Prerequisites 
 
- Node.js 
- MySQL 
- dotenv package for environment variables 
 
### Installation 
 
1. **Clone the repository:** 
 
   ```bash 
   git clone https://github.com/yourusername/your-repository.git 
   ``` 
 
2. **Navigate into the project directory:** 
 
   ```bash 
   cd your-repository 
   ``` 
 
3. **Install dependencies:** 
 
   ```bash 
   npm install 
   ``` 
 
4. **Set up environment variables:** 
 
   Create a `.env` file in the root directory of the project and add the following variables: 
 
   ```env 
   DB_HOST=your_database_host 
   DB_USER=your_database_user 
   DB_PASS=your_database_password 
   DB_DATA=your_database_name 
   KEY_AUTH=your_jwt_secret_key 
   ``` 
 
5. **Start the server:** 
 
   ```bash 
   npm start 
   ``` 
 
   The server will be running on `http://localhost:3000`. 
 
## API Endpoints 
 
### Register 
 
- **URL:** `/api/register` 
- **Method:** `POST` 
- **Request Body:** 
 
   ```json 
   { 
     "username": "user123", 
     "email": "user@example.com", 
     "password": "password123" 
   } 
   ``` 
 
- **Responses:** 
 
 - **201 Created** 
 
   ```json 
   { 
     "token": "your_jwt_token" 
   } 
   ``` 
 
 - **400 Bad Request** 
 
   ```json 
   { 
     "error": "Please provide username, email, and password" 
   } 
   ``` 
 
 - **409 Conflict** 
 
   ```json 
   { 
     "error": "User with this email or username already exists" 
   } 
   ``` 
 
### Login 
 
- **URL:** `/api/login` 
- **Method:** `POST` 
- **Request Body:** 
 
   ```json 
   { 
     "emailOrUsername": "user@example.com", 
     "password": "password123" 
   } 
   ``` 
 
- **Responses:** 
 
 - **200 OK** 
 
   ```json 
   { 
     "token": "your_jwt_token", 
     "message": "success" 
   } 
   ``` 
 
 - **400 Bad Request** 
 
   ```json 
   { 
     "error": "Please provide email or username and password" 
   } 
   ``` 
 
 - **401 Unauthorized** 
 
   ```json 
   { 
     "error": "Invalid email/username or password" 
   } 
   ``` 
 
## Database Schema 
 
Ensure your MySQL database has the following table: 
 
   ```sql 
   CREATE TABLE users ( 
       id INT AUTO_INCREMENT PRIMARY KEY, 
       username VARCHAR(255) UNIQUE NOT NULL, 
       email VARCHAR(255) UNIQUE NOT NULL, 
       password VARCHAR(255) NOT NULL 
   ); 
   ``` 
 
## Contributing 
Feel free to open an issue or submit a pull request if you have suggestions or improvements. 
 
## License 
This project is licensed under the MIT License
