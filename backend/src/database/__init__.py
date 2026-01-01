from sqlmodel import create_engine, Session
from typing import Generator
import os
from contextlib import contextmanager

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/todo_db")

# Create engine
engine = create_engine(DATABASE_URL, echo=True)

@contextmanager
def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session