# Short.ly - URL Shortener Service

A modern, full-stack URL shortening application that allows users to create short, memorable links, track click analytics, and manage their shortened URLs from a personalized dashboard. Built with a secure backend API and responsive React frontend.

## Features

- **User Authentication**: Secure registration and login with JWT token-based authentication
- **URL Shortening**: Generate short, unique URL codes using nanoid
- **Link Management**: View all created links in a personalized dashboard
- **Click Tracking**: Monitor the number of clicks on each shortened link
- **Copy to Clipboard**: Easily copy shortened URLs with a single click
- **User Profile Display**: See logged-in user information in the navbar
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Quick Link Creation**: Create new links directly from the dashboard
- **Link Persistence**: All links are persisted to MongoDB for reliable access

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure authentication
- **bcryptjs** - Password hashing
- **nanoid** - Unique short code generation
- **dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Modern styling with CSS variables

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivek-kumar-github/url-shortener-service.git
   cd url-shortener-service
   ```

2. **Setup Backend**

   Navigate to the root directory and install dependencies:
   ```bash
   npm install
   ```

   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/url-shortener
   JWT_SECRET=your_super_secret_jwt_key_here
   BASE_URL=http://localhost:5000
   PORT=5000
   ```

3. **Setup Frontend**

   Navigate to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Run the Application**

   From the root directory, start the backend server:
   ```bash
   npm run dev
   ```

   In a new terminal, start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

   The application will be available at:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## Usage

### For End Users

1. **Register for an Account**
   - Navigate to the registration page
   - Fill in your name, email, and password
   - You'll be automatically redirected to the login page

2. **Log In**
   - Enter your email and password
   - You'll be redirected to the dashboard

3. **Create a Short Link**
   - Click "Create New Link" on the dashboard to go to the home page
   - Or paste a long URL on the home page
   - Click "Shorten URL" to generate a short link
   - Copy the shortened URL to your clipboard

4. **Manage Your Links**
   - View all your created links in the dashboard
   - See the click count for each link
   - Copy any link quickly with the copy button
   - Click the refresh button to update link data

5. **Log Out**
   - Click the "Logout" button in the navbar

### API Endpoints

#### Authentication
- **POST** `/api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- **POST** `/api/auth/login` - Authenticate user
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- **GET** `/api/auth/me` - Get current user profile (requires token)

#### URL Management
- **POST** `/api/shorten` - Create a new short URL
  ```json
  {
    "longUrl": "https://example.com/very/long/url/to/shorten"
  }
  ```

- **GET** `/api/links` - Get all links for authenticated user (requires token)

- **GET** `/:code` - Redirect to original URL

## Project Structure

```
url-shortener-service/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # User registration, login, profile
│   ├── linksController.js    # User link management
│   └── urlController.js      # URL shortening and redirection
├── middleware/
│   └── auth.js               # JWT verification middleware
├── models/
│   ├── Url.js                # URL schema and model
│   └── User.js               # User schema and model
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── index.js              # Index routes
│   ├── links.js              # Link management routes
│   └── urls.js               # URL shortening routes
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── Spinner.jsx
│   │   ├── context/          # React context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   └── useAuth.js
│   │   ├── pages/            # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── services/         # API services
│   │   │   ├── apiService.js
│   │   │   ├── authService.js
│   │   │   └── linkService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server.js                 # Express server entry point
├── package.json
└── README.md
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/url-shortener

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
BASE_URL=http://localhost:5000

# Node Environment
NODE_ENV=development
```

### Key Configuration Files

- **Backend**: `server.js` - Main Express application setup
- **Frontend**: `client/vite.config.js` - Vite build configuration
- **Database**: `config/db.js` - MongoDB connection setup

## Security Considerations

- Passwords are hashed using bcryptjs before storage
- JWT tokens expire after 1 hour
- Protected routes require valid authentication tokens
- Email validation is enforced using regex patterns
- Input validation is performed on the backend
- CORS should be configured for production environments

## Building for Production

### Backend
```bash
npm install
NODE_ENV=production node server.js
```

### Frontend
```bash
cd client
npm install
npm run build
```

The built frontend will be in `client/dist/`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Write clean, readable code
- Follow the existing project structure
- Test your changes thoroughly
- Update documentation as needed

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check your cloud connection string
- Verify `MONGO_URI` in `.env` is correct

### Frontend Build Errors
- Clear node_modules and reinstall: `cd client && rm -rf node_modules && npm install`
- Ensure Node.js version is v14 or higher

### Authentication Issues
- Clear browser localStorage to reset authentication state
- Ensure `JWT_SECRET` is set in `.env`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Vivek Kumar**  
Full-stack developer passionate about building scalable web applications.

GitHub: https://github.com/vivek-kumar-github

---

## Support

For issues, questions, or feature requests, please open an issue in this repository.

**Happy URL shortening! 🚀**