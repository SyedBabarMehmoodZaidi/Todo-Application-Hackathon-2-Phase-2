# Multi-User Todo Web Application

A full-stack multi-user todo web application with Next.js frontend, FastAPI backend, and PostgreSQL database. The system uses JWT-based authentication via Better Auth for user isolation and secure access to personal todo lists. Features a professional SaaS-style UI with Tailwind CSS.

## Features

- User registration and authentication with JWT tokens
- Secure task management with user isolation
- Full CRUD operations for todo tasks
- Task completion tracking
- Professional SaaS-style UI with responsive design
- Persistent navigation with global Navbar and Footer

## Tech Stack

- **Frontend**: Next.js 16+, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: SQLModel
- **Authentication**: JWT with Better Auth
- **Frontend Framework**: React with TypeScript

## Setup Instructions

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL database
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database and auth configuration
   ```

5. Run the backend server:
   ```bash
   uvicorn src.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (including Tailwind CSS):
   ```bash
   npm install
   ```

3. If you need to reinstall Tailwind CSS dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API configuration
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

The application provides the following API endpoints:

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/{user_id}/tasks` - Get user's tasks
- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Update task completion status

## Security

- All API endpoints require valid JWT tokens
- User data isolation enforced at the database level
- Passwords are hashed using bcrypt
- Input validation on both frontend and backend

## Architecture

The application follows a clean architecture with:

- Clear separation between frontend and backend
- RESTful API communication
- JWT-based authentication
- SQLModel for database operations
- Next.js App Router for frontend routing
- Tailwind CSS for professional UI styling
- Persistent layouts with Navbar and Footer