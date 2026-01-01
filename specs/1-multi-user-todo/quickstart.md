# Quickstart: Enhanced Frontend UI for Multi-User Todo Web Application

## Prerequisites

- Node.js 18+ (for frontend development)
- Python 3.11+ (for backend development)
- PostgreSQL (or access to Neon Serverless PostgreSQL)
- Git
- npm or yarn package manager

## Environment Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup (Unchanged)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database and auth configuration
```

### 3. Enhanced Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (including Tailwind CSS)
npm install
# or
yarn install

# Install Tailwind CSS dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API and auth configuration
```

### 4. Configure Tailwind CSS

Create or update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
```

Add Tailwind directives to `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Running the Application

### 1. Start the Backend

```bash
cd backend
source venv/bin/activate

# Start the FastAPI server
uvicorn src.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

### 2. Start the Enhanced Frontend

```bash
cd frontend

# Start the Next.js development server
npm run dev
# or
yarn dev
```

The enhanced frontend will be available at `http://localhost:3000`

## Enhanced UI Features

### Global Layout
- Persistent Navbar with navigation links
- Persistent Footer with additional information
- Responsive design that works on all device sizes

### Landing Page
- Professional hero section with value proposition
- Features section highlighting core capabilities
- Clear call-to-action buttons for signup/login

### Authentication Pages
- Enhanced login and registration forms
- Consistent styling with the overall application
- Proper loading and error states

### Dashboard
- Professional dashboard layout with sidebar navigation
- Task management interface with create, update, complete, and delete functionality
- Responsive design for optimal experience on all devices

## Development Workflow

1. **Feature Development**: Create feature branches from main
2. **Testing**: Run both backend and frontend tests before committing
3. **Environment Variables**: Use separate .env files for different environments
4. **Component Development**: Use reusable UI components for consistency

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
# or for end-to-end tests
npm run test:e2e
```

## Deployment

### Backend Deployment (Unchanged)
1. Ensure environment variables are set for production
2. Run database migrations in production
3. Deploy using your preferred method (Docker, VPS, cloud platform)

### Enhanced Frontend Deployment
1. Build the application: `npm run build`
2. Ensure Tailwind CSS is properly configured for production
3. Serve the build directory using a web server
4. Ensure API endpoints are correctly configured for production