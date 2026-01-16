from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import using relative imports for when run as a module
try:
    from .src.api.auth import router as auth_router
    from .src.api.tasks import router as tasks_router
    from .src.api.categories import router as categories_router
    from .src.database import engine
    from .src.models.user import User
    from .src.models.task import Task
    from .src.models.category import Category
except ImportError:
    # Import using absolute imports for when run directly
    from src.api.auth import router as auth_router
    from src.api.tasks import router as tasks_router
    from src.api.categories import router as categories_router
    from src.database import engine
    from src.models.user import User
    from src.models.task import Task
    from src.models.category import Category
from sqlmodel import SQLModel


def create_app():
    # Ensure models are registered before creating the app
    from src.models.user import User  # noqa: F401
    from src.models.task import Task  # noqa: F401
    from src.models.category import Category  # noqa: F401

    app = FastAPI(title="Todo Web Application API", version="1.0.0")

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://0.0.0.0:3000", "http://localhost:3002"],  # Allow frontend origins including Next.js dev server
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allow_headers=["*"],  # Allow all headers including Authorization
        # Expose the authorization header
        expose_headers=["Access-Control-Allow-Origin", "Authorization", "Content-Type", "Access-Control-Allow-Credentials"]
    )

    # Include routers
    app.include_router(auth_router, prefix="/api")
    app.include_router(tasks_router, prefix="/api")
    app.include_router(categories_router, prefix="/api")

    @app.on_event("startup")
    def startup_event():
        print("Starting up...")
        try:
            # Create database tables with timeout handling
            import threading
            def create_tables():
                try:
                    SQLModel.metadata.create_all(bind=engine)
                    print("Database tables created successfully")
                except Exception as e:
                    print(f"Error creating database tables: {e}")

            # Run table creation in a separate thread to not block startup
            table_thread = threading.Thread(target=create_tables)
            table_thread.daemon = True
            table_thread.start()
            print("Database initialization started in background")
        except Exception as e:
            print(f"Error initiating database setup: {e}")

    @app.get("/")
    def read_root():
        return {"message": "Welcome to the Todo Web Application API"}

    @app.get("/health")
    def health_check():
        return {"status": "healthy"}

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)