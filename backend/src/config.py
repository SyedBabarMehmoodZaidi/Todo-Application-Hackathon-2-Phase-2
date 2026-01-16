from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database settings
    DATABASE_URL: str = "sqlite:///./todo_local.db"  # Default fallback
    db_echo: bool = False

    # Auth settings
    BETTER_AUTH_SECRET: str = ""
    BETTER_AUTH_URL: str = ""

    # JWT settings
    SECRET_KEY: str = "your-default-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Neon database settings
    neon_database_url: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()