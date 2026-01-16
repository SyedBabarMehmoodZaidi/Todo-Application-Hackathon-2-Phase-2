#!/usr/bin/env python3
"""
Script to initialize the database tables for the Todo application.
Run this separately to create tables without blocking server startup.
"""

import sys
import time
from src.database import engine
from src.models.user import User
from src.models.task import Task
from src.models.category import Category
from sqlmodel import SQLModel


def init_db():
    print("Initializing database tables...")

    try:
        # Create all tables
        SQLModel.metadata.create_all(bind=engine)
        print("✓ Database tables created successfully!")

        # Verify the connection works
        with engine.connect() as conn:
            result = conn.execute("SELECT 1")
            print("✓ Database connection verified!")

        print("\nDatabase initialization completed successfully.")
        print("You can now start the backend server with: uvicorn main:app --reload")

    except Exception as e:
        print(f"✗ Error initializing database: {e}")
        return False

    return True


if __name__ == "__main__":
    print("Todo Application - Database Initialization Script")
    print("=" * 50)

    success = init_db()

    if not success:
        print("\nDatabase initialization failed. Please check your connection settings.")
        sys.exit(1)

    print("\nInitialization complete! You can now start your backend server.")