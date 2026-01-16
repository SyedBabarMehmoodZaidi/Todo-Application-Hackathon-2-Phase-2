from sqlmodel import create_engine, Session
from .config import settings
from typing import Generator

# Create the database engine with Neon-compatible settings
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.db_echo,  # Set to True for SQL query logging
    pool_pre_ping=True,
    pool_size=2,  # Smaller pool for Neon
    max_overflow=5,
    pool_recycle=300,
    pool_timeout=20,
    connect_args={
        "connect_timeout": 15,
    },
)

def get_session() -> Generator[Session, None, None]:
    """Dependency to get a database session."""
    with Session(engine) as session:
        yield session