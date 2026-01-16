#!/usr/bin/env python3
"""
Script to add missing columns to existing database tables.
This is needed when switching from SQLite to PostgreSQL and the schema is not synchronized.
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '.'))

from sqlmodel import SQLModel, create_engine, text
from src.config import settings
from src.models.task import Task
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def add_missing_columns():
    """Add missing columns to the task table if they don't exist."""

    # Create engine using the current database URL
    engine = create_engine(settings.database_url, echo=True)

    with engine.connect() as conn:
        # Check if due_date column exists in task table
        if 'postgresql' in settings.database_url.lower():
            # PostgreSQL specific query to check for column existence
            result = conn.execute(text("""
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name = 'task' AND column_name = 'due_date';
            """))

            if not result.fetchone():
                # Column doesn't exist, add it
                logger.info("Adding missing 'due_date' column to task table...")
                conn.execute(text("ALTER TABLE task ADD COLUMN due_date TIMESTAMP WITH TIME ZONE DEFAULT NULL;"))
                conn.commit()
                logger.info("Successfully added 'due_date' column to task table.")
            else:
                logger.info("'due_date' column already exists in task table.")

            # Also check for other potentially missing columns based on the model
            columns_to_check = [
                ('priority', 'VARCHAR(50) DEFAULT \'medium\''),
                ('status', 'VARCHAR(50) DEFAULT \'pending\''),
                ('created_at', 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP'),
                ('updated_at', 'TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP')
            ]

            for col_name, col_def in columns_to_check:
                result = conn.execute(text(f"""
                    SELECT column_name
                    FROM information_schema.columns
                    WHERE table_name = 'task' AND column_name = '{col_name}';
                """))

                if not result.fetchone():
                    logger.info(f"Adding missing '{col_name}' column to task table...")
                    conn.execute(text(f"ALTER TABLE task ADD COLUMN {col_name} {col_def};"))
                    conn.commit()
                    logger.info(f"Successfully added '{col_name}' column to task table.")

        elif 'sqlite' in settings.database_url.lower():
            # SQLite specific query to check for column existence
            result = conn.execute(text("PRAGMA table_info(task);"))
            existing_columns = [row[1] for row in result.fetchall()]

            if 'due_date' not in existing_columns:
                logger.info("Adding missing 'due_date' column to task table...")
                conn.execute(text("ALTER TABLE task ADD COLUMN due_date DATETIME DEFAULT NULL;"))
                conn.commit()
                logger.info("Successfully added 'due_date' column to task table.")
            else:
                logger.info("'due_date' column already exists in task table.")

        logger.info("Column check and update completed.")

if __name__ == "__main__":
    add_missing_columns()