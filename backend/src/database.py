from sqlmodel import create_engine, Session
from .config import settings
from typing import Generator

# Create the database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.db_echo,  # Set to True for SQL query logging
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    pool_recycle=300,
)

def get_session() -> Generator[Session, None, None]:
    """Dependency to get a database session."""
    with Session(engine) as session:
        yield session